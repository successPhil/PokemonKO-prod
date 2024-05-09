import random
from rest_framework.permissions import AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Pokemon, Move
from .serializers import PokemonSerializer

class PokemonAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        """
        This view takes the Pokemon and Moves in our database, and randomly chooses moves for all of the pokemon in our database

        Returns:
            List of Pokemon with Moves, 200 OK
        """
        pokemons = Pokemon.objects.all()
        
        # Iterate over each Pokémon
        for pokemon in pokemons:
            # Get types of the current Pokémon
            types = pokemon.types.split('-')

            # Select moves based on the number of types
            moves = []
            if len(types) == 2:
                # Pokémon has two types
                for type_name in types:
                    # Query moves by type
                    moves_by_type = Move.objects.filter(type=type_name)
                    if moves_by_type.exists():
                        # Select 2 random moves for each type
                        random_moves = random.sample(list(moves_by_type), min(len(moves_by_type), 2))
                        moves.extend(random_moves)
            else:
                # Pokémon has one type
                # Query moves by type
                moves_by_type = Move.objects.filter(type__in=types)
                if moves_by_type.exists():
                    # Select 4 random moves for the type
                    random_moves = random.sample(list(moves_by_type), min(len(moves_by_type), 4))
                    moves.extend(random_moves)

            # Update the Pokémon with selected moves
            pokemon.moves.set(moves)

        # Serialize the updated Pokémon data
        serializer = PokemonSerializer(pokemons, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)