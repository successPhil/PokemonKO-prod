from django.urls import path

from pokemon.views import PokemonAPIView

urlpatterns = [

path('pokemon/', PokemonAPIView.as_view(), name='pokemon-list'),

]