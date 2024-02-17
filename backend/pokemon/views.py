import requests
import random
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Pokemon, Move
from .serializers import PokemonSerializer



class PokemonAPIView(APIView):
    permission_classes = [AllowAny] # We want this unprotected so there is no dependency on user to generate game pokemon
    def get(self, request):
        try:
            if not Pokemon.objects.exists():
                initial_data = self.fetch_initial_pokemon_data() #Lists all of the pokemon and moves so we can extract pokemon name and move name
                names = [pokemon["name"] for pokemon in initial_data["pokemon_species"]] #Results in list of pokemon names
                all_moves = [move_data["name"] for move_data in initial_data["moves"]] #Results in list of move names
                details, all_types = self.fetch_pokemon_details(names) #Returns Pokemon: name, types, front and back img, list of types
                processed_data = self.process_pokemon_data(details, all_moves, all_types)
            processed_data = self.retrieve_processed_data()

            return Response(processed_data, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        
    def fetch_initial_pokemon_data(self):
        url = "https://pokeapi.co/api/v2/generation/1"
        response = requests.get(url)
        if response.status_code == 200:
            return response.json()
        else:
            raise Exception("Failed to fetch pokemon data")

    def fetch_pokemon_details(self, names): #Takes in list of pokemon names
        details = [] #List of pokemon objects with name, type, front and back img
        all_types = set() #Make a set, to safely add all types and be left with unique list of types
        for name in names:
            # Make a separate API request for each Pokémon name
            url = f"https://pokeapi.co/api/v2/pokemon/{name}"  
            response = requests.get(url)
            if response.status_code == 200:
                pokemon_data = response.json()
                # Extract relevant data and create a dictionary
                pokemon_details = {
                    "name": pokemon_data["name"], #Name of current pokemon
                    "type": [type_data["type"]["name"] for type_data in pokemon_data["types"]], #List of types for the current pokemon
                    "front_image_url": pokemon_data["sprites"]["front_default"], #Url for front img
                    "back_image_url": pokemon_data["sprites"]["back_default"], #Url for back img
                }
                details.append(pokemon_details)
                all_types.update(pokemon_details["type"]) #Add types to list to set of types
            else:
                raise Exception(f"Failed to fetch data for Pokémon: {name}")
        return details, list(all_types) #Returning a list of pokemon: name, type, front and back img, converting set of types to list

    def process_pokemon_data(self, details, all_moves, all_types):
        #details: List of Pokemon Objects: name, types, front and back image
        #all_moves: List of move names
        #all_types: List of all types
        #We update objects to have random moves
        processed_data = []
        for detail in details:
            name = detail["name"]
            type_str = ", ".join(detail["type"]) #Handle multiple types
            front_image_url = detail["front_image_url"]
            back_image_url = detail["back_image_url"]
            self.create_pokemon_with_moves(name=name, types=type_str, front_image_url=front_image_url, back_image_url=back_image_url, all_moves=all_moves, all_types=all_types)
            pokemon_moves = self.get_random_moves(all_moves, all_types)

            processed_detail = {
                "name": name,
                "type": type_str,
                "front_image_url": front_image_url,
                "back_image_url": back_image_url,
                "moves": pokemon_moves,
            }
            processed_data.append(processed_detail)
        return processed_data

    def get_random_moves(self, all_moves, all_types):
        num_moves = 4  # Number of moves a Pokémon can have
        random_moves = random.sample(all_moves, num_moves)  # Select random moves from the list
        moves_with_damage = [{"name": move, "damage": random.randint(2, 10), "type": random.choice(all_types)} for move in random_moves]
        return moves_with_damage
    
    def create_pokemon_with_moves(self, name, types, front_image_url, back_image_url, all_moves, all_types):
        pokemon = Pokemon.objects.create(
            name=name,
            types=types,
            front_image_url=front_image_url,
            back_image_url=back_image_url,
        )

        move_data = self.get_random_moves(all_moves, all_types)
        for move in move_data:
            move = Move.objects.create(
                name=move["name"],
                type=move["type"],
                damage=move["damage"]
            )
            pokemon.moves.add(move)
        return pokemon
    
    def retrieve_processed_data(self):
        pokemons = Pokemon.objects.all()
        serializer = PokemonSerializer(pokemons, many=True)
        return serializer.data
