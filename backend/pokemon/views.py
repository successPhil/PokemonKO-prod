import requests
import random
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Pokemon, Move
from .serializers import PokemonSerializer

class PokemonAPIView(APIView):
    def get(self, request):
        try:
            if not Pokemon.objects.exists():
                initial_data = self.fetch_initial_pokemon_data()
                names = [pokemon["name"] for pokemon in initial_data["pokemon_species"]]
                all_moves = [move_data["name"] for move_data in initial_data["moves"]]
                details, all_types = self.fetch_pokemon_details(names)
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

    def fetch_pokemon_details(self, names):
        details = []
        all_types = set()
        for name in names:
            # Make a separate API request for each Pokémon name
            url = f"https://pokeapi.co/api/v2/pokemon/{name}"  # Replace with the correct URL
            response = requests.get(url)
            if response.status_code == 200:
                pokemon_data = response.json()
                # Extract relevant data and create a dictionary
                pokemon_details = {
                    "name": pokemon_data["name"],
                    "type": [type_data["type"]["name"] for type_data in pokemon_data["types"]],
                    "front_image_url": pokemon_data["sprites"]["front_default"],
                    "back_image_url": pokemon_data["sprites"]["back_default"],
                }
                details.append(pokemon_details)
                all_types.update(pokemon_details["type"])
            else:
                raise Exception(f"Failed to fetch data for Pokémon: {name}")
        return details, list(all_types)

    def process_pokemon_data(self, details, all_moves, all_types):
        processed_data = []
        for detail in details:
            name = detail["name"]
            type_str = ", ".join(detail["type"])
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
