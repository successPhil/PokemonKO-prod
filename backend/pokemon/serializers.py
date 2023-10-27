from rest_framework import serializers
from .models import Pokemon, Move
from moves.serializers import MoveSerializer

class PokemonSerializer(serializers.ModelSerializer):
    moves = MoveSerializer(many=True)  # Use MoveSerializer for moves

    class Meta:
        model = Pokemon
        fields = '__all__'

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        moves = rep.pop('moves')  # Remove 'moves' from the representation
        rep['moves'] = moves  # Re-add 'moves' at the end
        return rep

