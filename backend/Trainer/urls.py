from django.urls import path, register_converter
from rest_framework.authtoken.views import obtain_auth_token
from Trainer.views import SignupView, TrainerPokemonView, FirstPokemonView, EnemyPokemonView, BattleResultsView, ShopView, TrainerItems, TrainerView, TrainerRunView, TrainerReplenishShop
from .converters import IntOrStrConverter

register_converter(IntOrStrConverter, 'int_or_str')

urlpatterns = [
    path('get-token', obtain_auth_token),
    path('signup', SignupView.as_view()),
    path('', TrainerView.as_view()),
    path('run', TrainerRunView.as_view()),
    path('replenish-shop', TrainerReplenishShop.as_view()),
    path('first-poke', FirstPokemonView.as_view()),
    path('enemy-poke', EnemyPokemonView.as_view()),
    path('shop', ShopView.as_view()),
    path('shop/transaction', ShopView.as_view()),
    path('battleResults', BattleResultsView.as_view()),
    path('items', TrainerItems.as_view()),
    path('pokemon', TrainerPokemonView.as_view()),
    path('pokemon/<int_or_str:id>/', TrainerPokemonView.as_view())
]