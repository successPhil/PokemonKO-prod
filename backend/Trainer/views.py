from rest_framework.generics import CreateAPIView
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth.models import User
from Trainer.serializers import SignupSerializer, TrainerSerializer
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from Trainer.models import Trainer
from Items.models import Item
from pokemon.models import Pokemon
from Shop.views import create_initial_shop
from Items.serializers import ItemSerializer
from pokemon.serializers import PokemonSerializer

# handles request and parses body for username and password
class SignupView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = SignupSerializer
    permission_classes = [AllowAny]

    def perform_create(self, serializer):
        if serializer.is_valid():
            username = serializer.validated_data["username"]
            password = serializer.validated_data["password"]
            #create_user is special method. must be used to create user
            user = User.objects.create_user(username=username, password=password)
            trainer = Trainer.objects.create(user=user)
            initial_shop = create_initial_shop()
            trainer.shop = initial_shop
            trainer.save() # Save the trainer to associate them with the shop

            # Add 10 potions to the trainer
            potion_data = {"name": "HP Potion", "value": 25, "stat_boost": 50, "item_class": "health", "quantity": 30}

            item = Item.objects.create(
                name=potion_data["name"],
                value=potion_data["value"],
                stat_boost=potion_data["stat_boost"],
                item_class=potion_data["item_class"],
                quantity=potion_data["quantity"]
            )

            trainer.items.add(item)

            trainer_serializer = TrainerSerializer(trainer)

            return Response({
                'user_id': user.id,
                'trainer': trainer_serializer.data,
            }, status=status.HTTP_200_OK)


class TrainerView(APIView):
    def get(self, request):
        user = request.user

        try:
            trainer = Trainer.objects.get(user=user)
            serializer = TrainerSerializer(trainer)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class FirstPokemonView(APIView):
    def get(self, request):
        user = request.user

        try:
            trainer = Trainer.objects.get(user=user)
            if not trainer.pokemon.exists():
                trainer.first_pokemon()
                pokemon = trainer.pokemon.first()
                serializer = PokemonSerializer(pokemon)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                pokemon = trainer.pokemon.first()
                serializer = PokemonSerializer(pokemon)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
class EnemyPokemonView(APIView):
    def get(self, request):
        user = request.user

        try:
            trainer = Trainer.objects.get(user=user)
            print(trainer)
            if not trainer.enemy_pokemon.exists():
                trainer.get_enemy_pokemon()
                pokemon = trainer.enemy_pokemon.first()
                serializer = PokemonSerializer(pokemon)
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                pokemon = trainer.enemy_pokemon.first()
                serializer = PokemonSerializer(pokemon)
                return Response(serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'message': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TrainerRunView(APIView):
    def get(self, request):
        user = request.user

        try:
            trainer = Trainer.objects.get(user=user)
            if trainer.enemy_pokemon.exists():
                trainer.remove_enemy_pokemon()
                return Response({"message": "Successfully ran from battle"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

class TrainerReplenishShop(APIView):
    def get(self, request):
        user = request.user

        try:
            trainer = Trainer.objects.get(user=user)
            trainer.replenish_shop()
            return Response({"message": "Successfully replenished shop"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"message": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class TrainerPokemonView(APIView):
    def get(self, request, id=None):
        user = request.user
        try:
            trainer = Trainer.objects.get(user=user)  # Ensure trainer is retrieved correctly
            if id is not None: #handle retrieving detail view of trainer pokemon
                if isinstance(id, int): #check for id
                    trainer_poke = trainer.pokemon.get(id=id)
                elif isinstance(id, str): #check for name
                    trainer_poke = trainer.pokemon.get(name=id)
                else:
                    raise ValueError("Invalid ID or name")
                serializer = PokemonSerializer(trainer_poke) #serialize data for <str_or_int>
            else: # return list view of trainer pokemon
                all_pokemon = trainer.pokemon.all()
                serializer = PokemonSerializer(all_pokemon, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Trainer.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)


class BattleResultsView(APIView):    
    def put(self, request):
        user = request.user
        try:
            trainer = Trainer.objects.get(user=user)  # Ensure trainer is retrieved correctly

            # Retrieve data from the request
            trainer_data = request.data.get('trainer_data')
            # pokemon_id = trainer_data['pokemon_id']
            # current_health = trainer_data['current_health']
            # max_health = trainer_data['max_health']
            pokeToUpdate = trainer_data['selectPokemon']
            pokemon_id = pokeToUpdate['id']
            current_health = pokeToUpdate['health']
            max_health = pokeToUpdate['max_health']
            defense = pokeToUpdate['defense']
            power = pokeToUpdate['power']

            experience = trainer_data['experience']
            battle_result = trainer_data['battle_result']
            money = trainer_data['money']

            try:
                trainer_pokemon = trainer.pokemon.get(id=pokemon_id) #Ensure id is associated with trainer
            except Pokemon.DoesNotExist:
                trainer_pokemon = None #Set to None (will use as boolean for conditional)

            if trainer.enemy_pokemon.exists() and trainer_pokemon:
              if battle_result == 'win':
                trainer.add_enemy_pokemon()
                trainer.make_money(money)                
                trainer_pokemon.health = current_health
                trainer_pokemon.max_health = max_health
                trainer_pokemon.defense = defense
                trainer_pokemon.power = power
                trainer_pokemon.gain_experience(experience)
                trainer.save()
                serializer = PokemonSerializer(trainer_pokemon)
                return Response(serializer.data, status=status.HTTP_200_OK)
            if battle_result == 'lose' and trainer_pokemon:
                trainer.remove_pokemon(pokemon_id)
                return Response({"message": "Trainer pokemon successfully removed from trainer"}, status=status.HTTP_200_OK)
            else:
                return Response({"message": "Need a valid trainer pokemon id and enemy pokemon to get results"}, status=status.HTTP_400_BAD_REQUEST)
            
        except Trainer.DoesNotExist:
            return Response({'message': 'User profile not found.'}, status=status.HTTP_404_NOT_FOUND)
        

class ShopView(APIView):
    def get(self, request):
        user = request.user
        try:
            trainer = Trainer.objects.get(user=user)
            shop = trainer.shop.items.all()
            serializer = ItemSerializer(shop, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Trainer.DoesNotExist:
            return Response({"message": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        
    def put(self, request):
        user = request.user
        print(request, 'INCOMING REQUEST')
        try:
            trainer = Trainer.objects.get(user=user)
            transaction = request.data.get('transaction')
            item_id = transaction['item_id']
            item_qty = transaction['item_qty']
            action = transaction['action']

            if action == 'sell':
                try:
                    item = trainer.items.get(id=item_id)
                    if item_qty > item.quantity:
                        return Response({"message": "Invalid quantity received"})
                    trainer.sell_item(item, item_qty)
                    if item.quantity == 0:
                        return Response({"message": "Item qty reached 0 and has been removed"}, status=status.HTTP_200_OK)
                    updated = trainer.items.get(id=item_id)
                    serializer = ItemSerializer(updated)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except Item.DoesNotExist:
                    return Response({"message": "Item ID is not valid or Item quantity reached 0"}, status=status.HTTP_404_NOT_FOUND)
            
            if action == 'buy':
                try:
                    item = trainer.shop.items.get(id=item_id)
                    name = item.name
                    if item_qty > item.quantity:
                        return Response({"message": "Invalid quantity received"}, status=status.HTTP_400_BAD_REQUEST)
                    trainer.buy_item(item, item_qty)
                    updated = trainer.items.get(name=name)
                    serializer = ItemSerializer(updated)
                    return Response(serializer.data, status=status.HTTP_200_OK)
                except Item.DoesNotExist:
                    return Response({"message": "Item ID is not valid"}, status=status.HTTP_404_NOT_FOUND)
            
        except Trainer.DoesNotExist:
            return Response({"message": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)
        

class TrainerItems(APIView):
    def get(self, request):
        user = request.user
        try:
            trainer = Trainer.objects.get(user=user)
            trainer_items = trainer.items.all()
            serializer = ItemSerializer(trainer_items, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Trainer.DoesNotExist:
            return Response({"message": "User profile does not exist"}, status=status.HTTP_404_NOT_FOUND)

