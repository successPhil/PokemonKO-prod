from django.contrib.auth.models import User
from Trainer.models import Trainer
from pokemon.models import Pokemon
from moves.models import Move

from rest_framework.test import APITestCase

class SignupViewTest(APITestCase):
    def setUp(self):
        url = '/login/signup'  #url for signup view
        data = {
            "username": "testuser1",
            "password": "testpassword"
        }
        #use client to make post to url with data
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, 201) #check response of post
        self.trainer = Trainer.objects.get(user__username='testuser1') #store trainer for testing
        self.pokemon = Pokemon.objects.create(name='charmander',types='fire', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.store_item = self.trainer.shop.items.get(name='Warm Home Cooked Meal') #Item from store
        self.default_item = self.trainer.shop.items.get(name='HP Potion') #Initial Trainer Item
        self.trainer_item = self.trainer.items.get(name='HP Potion')
        self.initial_item_qty = self.trainer_item.quantity #Starting item quantity (HP Potion)
        self.initial_money = self.trainer.money #starting money
        self.assertIsNotNone(self.store_item) #make sure store item exists
        self.assertIsNotNone(self.default_item) #make sure default item exists
        self.initial_pokemon_count = self.trainer.pokemon.count() #initial pokemon count
        self.initial_enemy_count = self.trainer.enemy_pokemon.count() #initial enemy pokemon count
        self.initial_trainer_power = self.trainer.trainer_power # initial trainer power
        Move.objects.create(name='sucker punch', type='normal', damage=4 )
        Move.objects.create(name='fire punch', type='fire', damage=4 )
        Move.objects.create(name='ice punch', type='ice', damage=4 )
        Move.objects.create(name='leaf punch', type='grass', damage=4 )
        Move.objects.create(name='rock kick', type='normal', damage=4 )

    def test_signup_view(self):
        self.assertEqual(User.objects.count(), 1)
        self.assertEqual(Trainer.objects.count(), 1)

    def test_trainer_creation(self):
        self.assertEqual(User.objects.count(), 1) #Check User is created
        self.assertEqual(Trainer.objects.count(), 1) #Check Trainer is created
        # Check if the Trainer has the correct initial shop and items
        self.assertIsNotNone(self.trainer.shop) #Shop exists
        self.assertEqual(self.trainer.items.count(), 1) #Initial items exist

    def test_make_money(self):
        self.trainer.make_money(1000)
        final_money = self.trainer.money
        self.assertEqual(final_money-self.initial_money, 1000)

    def test_list_items(self):
        trainer_items = self.trainer.items.all()
        self.assertEqual(len(trainer_items), self.trainer.items.count())

    def test_buy_existing_item_default_qty(self):
        initial_store_qty = self.default_item.quantity
        initial_trainer_qty = self.trainer.items.get(name='HP Potion').quantity
        self.trainer.buy_item(self.default_item)
        final_money = self.trainer.money
        final_store_qty = self.default_item.quantity
        final_trainer_qty = self.trainer.items.get(name='HP Potion').quantity
        
        self.assertEqual(self.initial_money-final_money, self.default_item.value) #Check trainer money
        self.assertEqual(final_store_qty + 1, initial_store_qty) #Check store qty
        self.assertEqual(final_trainer_qty - 1, initial_trainer_qty) #Check trainer qty
    
    def test_buy_existing_item_valid_qty(self):
        initial_store_qty = self.default_item.quantity
        initial_trainer_qty = self.trainer.items.get(name='HP Potion').quantity
        self.trainer.buy_item(self.default_item, 4)
        final_money = self.trainer.money
        final_store_qty = self.default_item.quantity
        final_trainer_qty = self.trainer.items.get(name='HP Potion').quantity
        self.assertEqual(self.initial_money-final_money, self.default_item.value * 4)
        self.assertEqual(final_store_qty + 4, initial_store_qty)
        self.assertEqual(final_trainer_qty - 4, initial_trainer_qty)

    def test_buy_existing_item_invalid_qty(self):
        initial_store_qty = self.default_item.quantity
        initial_trainer_qty = self.trainer.items.get(name='HP Potion').quantity
        self.trainer.buy_item(self.default_item, 450)
        final_money = self.trainer.money
        final_store_qty = self.default_item.quantity
        final_trainer_qty = self.trainer.items.get(name='HP Potion').quantity
        self.assertEqual(self.initial_money, final_money)
        self.assertEqual(initial_store_qty, final_store_qty)
        self.assertEqual(initial_trainer_qty, final_trainer_qty)

    def test_buy_new_item_default_qty(self):
        initial_store_qty = self.store_item.quantity
        initial_trainer_qty = 0
        self.trainer.buy_item(self.store_item)
        final_money = self.trainer.money
        final_store_qty = self.store_item.quantity
        final_trainer_qty = self.trainer.items.get(name='Warm Home Cooked Meal').quantity
        self.assertEqual(self.initial_money-final_money, self.store_item.value)
        self.assertEqual(final_store_qty + 1, initial_store_qty)
        self.assertEqual(final_trainer_qty - 1, initial_trainer_qty)

    def test_buy_new_item_valid_qty(self):
        initial_store_qty = self.store_item.quantity
        initial_trainer_qty = 0
        self.trainer.buy_item(self.store_item, 2)
        final_money = self.trainer.money
        final_store_qty = self.store_item.quantity
        final_trainer_qty = self.trainer.items.get(name='Warm Home Cooked Meal').quantity
        self.assertEqual(self.initial_money-final_money, self.store_item.value * 2)
        self.assertEqual(final_store_qty + 2, initial_store_qty)
        self.assertEqual(final_trainer_qty - 2, initial_trainer_qty)

    def test_buy_new_item_invalid_qty(self):
        initial_store_qty = self.store_item.quantity
        initial_trainer_qty = 0
        self.trainer.buy_item(self.store_item, 200)
        final_money = self.trainer.money
        final_store_qty = self.store_item.quantity
        final_trainer_qty = self.trainer.items.get(name='Warm Home Cooked Meal').quantity
        self.assertEqual(self.initial_money, final_money)
        self.assertEqual(final_store_qty, initial_store_qty)
        self.assertEqual(final_trainer_qty, initial_trainer_qty)

    def test_sell_item_default_qty(self):
        initial_trainer_qty = self.trainer_item.quantity    
        initial_store_qty = self.trainer.shop.items.get(name='HP Potion').quantity
        self.trainer.sell_item(self.trainer_item)
        final_money = self.trainer.money
        final_trainer_qty = self.trainer_item.quantity
        final_store_qty = self.trainer.shop.items.get(name='HP Potion').quantity
        self.assertEqual(final_money-self.initial_money, self.trainer_item.value)
        self.assertEqual(final_trainer_qty + 1, initial_trainer_qty)
        self.assertEqual(final_store_qty - 1, initial_store_qty)

    def test_sell_item_valid_qty(self):
        initial_trainer_qty = self.trainer_item.quantity    
        initial_store_qty = self.trainer.shop.items.get(name='HP Potion').quantity
        self.trainer.sell_item(self.trainer_item, 3)
        final_money = self.trainer.money
        final_trainer_qty = self.trainer_item.quantity
        final_store_qty = self.trainer.shop.items.get(name='HP Potion').quantity
        self.assertEqual(final_money-self.initial_money, self.trainer_item.value * 3)
        self.assertEqual(final_trainer_qty + 3, initial_trainer_qty)
        self.assertEqual(final_store_qty - 3, initial_store_qty)

    def test_sell_item_invalid_qty(self):
        initial_trainer_qty = self.trainer_item.quantity    
        initial_store_qty = self.trainer.shop.items.get(name='HP Potion').quantity
        self.trainer.sell_item(self.trainer_item, 999)
        final_money = self.trainer.money
        final_trainer_qty = self.trainer_item.quantity
        final_store_qty = self.trainer.shop.items.get(name='HP Potion').quantity
        self.assertEqual(final_money, self.initial_money)
        self.assertEqual(final_trainer_qty, initial_trainer_qty)
        self.assertEqual(final_store_qty, initial_store_qty)

    def test_use_item_health_default_qty(self):
        self.trainer.first_pokemon()

        pokemon = self.trainer.pokemon.get(name='charmander')
        pokemon_initial_health = pokemon.health
        pokemon.decrease_health(50)
        self.assertEqual(pokemon_initial_health, pokemon.health + 50)

        self.trainer.use_item(self.trainer_item, pokemon)
        pokemon_final_health = pokemon.health
        item_final_qty = self.trainer_item.quantity
        self.assertEqual(pokemon_initial_health, pokemon_final_health)
        self.assertEqual(item_final_qty + 1, self.initial_item_qty)

    def test_use_item_health_multiple_qty(self):
        self.trainer.first_pokemon()

        pokemon = self.trainer.pokemon.get(name='charmander')
        pokemon_initial_health = pokemon.health
        pokemon.decrease_health(60)
        self.assertEqual(pokemon_initial_health, pokemon.health + 60)

        self.trainer.use_item(self.trainer_item, pokemon, 2)
        pokemon_final_health = pokemon.health
        item_final_qty = self.trainer_item.quantity
        self.assertEqual(pokemon_initial_health, pokemon_final_health)
        self.assertEqual(item_final_qty + 2, self.initial_item_qty)

    def test_use_item_bonus_default_health(self):
        poison = Pokemon.objects.create(name='bulbasaur',types='grass, poison', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(poison)
        trainer_poke = self.trainer.pokemon.get(name='bulbasaur')
       
        trainer_poke.increase_max_health(7000)
        self.trainer.make_money(6000)
        poison_health = self.trainer.shop.items.get(name='Venombane Elixir')
        before_purchase = self.trainer.money
        store_qty_before = poison_health.quantity
        self.trainer.buy_item(poison_health)
        after_purchase = self.trainer.money
        store_qty_after = poison_health.quantity
        self.assertEqual(after_purchase + poison_health.value, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 1) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name='Venombane Elixir')
        self.assertEqual(trainer_item.quantity, 1) #Check trainer successfully has Item
        initial_health = trainer_poke.health
        self.trainer.use_item(trainer_item, trainer_poke)
        final_health = trainer_poke.health
        self.assertEqual(final_health - 6000, initial_health)

        trainer_poke.decrease_health(6000)
        grass_health = self.trainer.shop.items.get(name='Photosynthesis Potion')
        before_purchase = self.trainer.money
        store_qty_before = grass_health.quantity
        self.trainer.buy_item(grass_health)
        after_purchase = self.trainer.money
        store_qty_after = grass_health.quantity
        trainer_item = self.trainer.items.get(name='Photosynthesis Potion')
        self.assertEqual(trainer_item.quantity, 1)
        self.assertEqual(after_purchase + grass_health.value, before_purchase)
        self.assertEqual(store_qty_after, store_qty_before - 1)
        initial_health = trainer_poke.health
        self.trainer.use_item(trainer_item, trainer_poke)
        final_health = trainer_poke.health
        self.assertEqual(final_health - 6000, initial_health)

        trainer_poke.decrease_health(6000)
        electric_health = self.trainer.shop.items.get(name='Electroshock Serum')
        before_purchase = self.trainer.money
        store_qty_before = electric_health.quantity
        self.trainer.buy_item(electric_health)
        after_purchase = self.trainer.money
        store_qty_after = electric_health.quantity
        trainer_item = self.trainer.items.get(name='Electroshock Serum')
        self.assertEqual(trainer_item.quantity, 1)
        self.assertEqual(after_purchase + electric_health.value, before_purchase)
        self.assertEqual(store_qty_after, store_qty_before - 1)
        initial_health = trainer_poke.health
        self.trainer.use_item(trainer_item, trainer_poke)
        final_health = trainer_poke.health
        self.assertEqual(final_health - 3000, initial_health) #Check we don't get a bonus for electric on grass, poison


    def test_use_item_bonus_multiple_health(self):
        ghost = Pokemon.objects.create(name='gengar',types='ghost, poison', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(ghost)
        trainer_poke = self.trainer.pokemon.get(name='gengar')
       
        trainer_poke.increase_max_health(20000)
        self.trainer.make_money(20000)
        ghost_health = self.trainer.shop.items.get(name='Ghostly Haze')
        before_purchase = self.trainer.money
        store_qty_before = ghost_health.quantity
        self.trainer.buy_item(ghost_health, 3)
        after_purchase = self.trainer.money
        store_qty_after = ghost_health.quantity
        self.assertEqual(after_purchase + ghost_health.value * 3, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 3) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name='Ghostly Haze')
        self.assertEqual(trainer_item.quantity, 3) #Check trainer successfully has Item
        initial_health = trainer_poke.health
        self.trainer.use_item(trainer_item, trainer_poke, 3)
        final_health = trainer_poke.health
        self.assertEqual(final_health - 18000, initial_health)

        trainer_poke.decrease_health(18000)
        poison_health = self.trainer.shop.items.get(name='Venombane Elixir')
        before_purchase = self.trainer.money
        store_qty_before = poison_health.quantity
        self.trainer.buy_item(poison_health, 2)
        after_purchase = self.trainer.money
        store_qty_after = poison_health.quantity
        trainer_item = self.trainer.items.get(name='Venombane Elixir')
        self.assertEqual(trainer_item.quantity, 2)
        self.assertEqual(after_purchase + poison_health.value * 2, before_purchase)
        self.assertEqual(store_qty_after, store_qty_before - 2)
        initial_health = trainer_poke.health
        self.trainer.use_item(trainer_item, trainer_poke, 2)
        final_health = trainer_poke.health
        self.assertEqual(final_health - 12000, initial_health)

        trainer_poke.decrease_health(12000)
        fairy_health = self.trainer.shop.items.get(name='Fae Essence Elixir')
        before_purchase = self.trainer.money
        store_qty_before = fairy_health.quantity
        self.trainer.buy_item(fairy_health, 3)
        after_purchase = self.trainer.money
        store_qty_after = fairy_health.quantity
        trainer_item = self.trainer.items.get(name='Fae Essence Elixir')
        self.assertEqual(trainer_item.quantity, 3)
        self.assertEqual(after_purchase + fairy_health.value * 3, before_purchase)
        self.assertEqual(store_qty_after, store_qty_before - 3)
        initial_health = trainer_poke.health
        self.trainer.use_item(trainer_item, trainer_poke, 3)
        final_health = trainer_poke.health
        self.assertEqual(final_health - 9000, initial_health) #Check we don't get a bonus for fairy on ghost, poison

    def test_use_item_bonus_default_maxhealth(self):
        dragon = Pokemon.objects.create(name='dragonite',types='dragon, flying', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(dragon)
        trainer_poke = self.trainer.pokemon.get(name='dragonite')
        initial_max_health = trainer_poke.max_health
        #Testing dragon max_health Item (bonus)

        self.trainer.make_money(6000)
        dragon_max_health = self.trainer.shop.items.get(name='Dragonfire Elixir')
        before_purchase = self.trainer.money
        store_qty_before = dragon_max_health.quantity
        self.trainer.buy_item(dragon_max_health)
        after_purchase = self.trainer.money
        store_qty_after = dragon_max_health.quantity
        self.assertEqual(after_purchase + dragon_max_health.value, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 1) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name='Dragonfire Elixir')
        self.assertEqual(trainer_item.quantity, 1) #Check trainer successfully has Item
        self.trainer.use_item(trainer_item, trainer_poke)
        final_maxhealth = trainer_poke.max_health
        self.assertEqual(final_maxhealth - 150, initial_max_health) #Check bonus properly applied

        #Testing flying max_health Item (bonus)
        initial_max_health = trainer_poke.max_health
        flying_max_health = self.trainer.shop.items.get(name='Aerial Draft Elixir')
        before_purchase = self.trainer.money
        store_qty_before = flying_max_health.quantity
        self.trainer.buy_item(flying_max_health)
        after_purchase = self.trainer.money
        store_qty_after = flying_max_health.quantity
        self.assertEqual(after_purchase + flying_max_health.value, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 1) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name='Aerial Draft Elixir')
        self.assertEqual(trainer_item.quantity, 1) #Check trainer successfully has Item
        self.trainer.use_item(trainer_item, trainer_poke)
        final_maxhealth = trainer_poke.max_health
        self.assertEqual(final_maxhealth - 150, initial_max_health) #Check bonus properly applied

        #Testing rock max_health Item (no bonus)
        initial_max_health = trainer_poke.max_health
        rock_max_health = self.trainer.shop.items.get(name='Stoneshield Tonic')
        before_purchase = self.trainer.money
        store_qty_before = rock_max_health.quantity
        self.trainer.buy_item(rock_max_health)
        after_purchase = self.trainer.money
        store_qty_after = rock_max_health.quantity
        self.assertEqual(after_purchase + rock_max_health.value, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 1) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name='Stoneshield Tonic')
        self.assertEqual(trainer_item.quantity, 1) #Check trainer successfully has Item
        self.trainer.use_item(trainer_item, trainer_poke)
        final_maxhealth = trainer_poke.max_health
        self.assertEqual(final_maxhealth - 75, initial_max_health) #Check bonus properly applied

    def test_use_item_bonus_multiple_maxhealth(self):
        flying = Pokemon.objects.create(name='pidgey',types='normal, flying', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(flying)
        trainer_poke = self.trainer.pokemon.get(name='pidgey')
        initial_max_health = trainer_poke.max_health
        #Testing fighting max_health Item (no bonus) qty 3

        self.trainer.make_money(30000)
        fighting_max_health = self.trainer.shop.items.get(name="Brawler's Brew")
        before_purchase = self.trainer.money
        store_qty_before = fighting_max_health.quantity
        self.trainer.buy_item(fighting_max_health, 3)
        after_purchase = self.trainer.money
        store_qty_after = fighting_max_health.quantity
        self.assertEqual(after_purchase + fighting_max_health.value * 3, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 3) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name="Brawler's Brew")
        self.assertEqual(trainer_item.quantity, 3) #Check trainer successfully has Item
        self.trainer.use_item(trainer_item, trainer_poke, 3)
        final_maxhealth = trainer_poke.max_health
        self.assertEqual(final_maxhealth - 225, initial_max_health) #Check bonus properly applied

        #Testing flying max_health Item (bonus) qty 2
        initial_max_health = trainer_poke.max_health
        flying_max_health = self.trainer.shop.items.get(name='Aerial Draft Elixir')
        before_purchase = self.trainer.money
        store_qty_before = flying_max_health.quantity
        self.trainer.buy_item(flying_max_health, 2)
        after_purchase = self.trainer.money
        store_qty_after = flying_max_health.quantity
        self.assertEqual(after_purchase + flying_max_health.value * 2, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 2) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name='Aerial Draft Elixir')
        self.assertEqual(trainer_item.quantity, 2) #Check trainer successfully has Item
        self.trainer.use_item(trainer_item, trainer_poke, 2)
        final_maxhealth = trainer_poke.max_health
        self.assertEqual(final_maxhealth - 300, initial_max_health) #Check bonus properly applied

        #Testing normal max_health Item (bonus) qty 10
        initial_max_health = trainer_poke.max_health
        normal_max_health = self.trainer.shop.items.get(name='Protein Shake')
        before_purchase = self.trainer.money
        store_qty_before = normal_max_health.quantity
        self.trainer.buy_item(normal_max_health, 10)
        after_purchase = self.trainer.money
        store_qty_after = normal_max_health.quantity
        self.assertEqual(after_purchase + normal_max_health.value * 10, before_purchase) #Check money properly deducted
        self.assertEqual(store_qty_after, store_qty_before - 10) #Check store decrements quantity
        trainer_item = self.trainer.items.get(name='Protein Shake')
        self.assertEqual(trainer_item.quantity, 10) #Check trainer successfully has Item
        self.trainer.use_item(trainer_item, trainer_poke, 10)
        final_maxhealth = trainer_poke.max_health
        self.assertEqual(final_maxhealth - 1500, initial_max_health) #Check bonus properly applied

    def test_use_item_bonus_damage(self):
        pokemon = Pokemon.objects.create(name='magnemite',types='electric, steel', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        trainer_poke = self.trainer.pokemon.get(name='magnemite')
        initial_power = trainer_poke.power
        self.trainer.make_money(10000)
        #Testing steel damage item (bonus)

        
        steel_item = self.trainer.shop.items.get(name='Steel Surge')
        money_before = self.trainer.money
        store_qty_before = steel_item.quantity
        self.trainer.buy_item(steel_item)
        money_after = self.trainer.money
        store_qty_after = steel_item.quantity

        self.assertEqual(money_after + steel_item.value, money_before)
        self.assertEqual(store_qty_after + 1, store_qty_before)

        trainer_item = self.trainer.items.get(name='Steel Surge')
        self.assertEqual(trainer_item.quantity, 1)

        self.trainer.use_item(trainer_item, trainer_poke)
        self.assertEqual(initial_power + 8, trainer_poke.power)
        self.assertFalse(self.trainer.items.filter(name='Steel Surge').exists())
        #psychic damage (no bonus)  qty 3 use 2
        initial_power = trainer_poke.power
        psychic_item = self.trainer.shop.items.get(name='Psionic Focus') #set item from shop
        money_before = self.trainer.money 
        store_qty_before = psychic_item.quantity #get qty of store item
        self.trainer.buy_item(psychic_item, 3)
        money_after = self.trainer.money
        store_qty_after = psychic_item.quantity #get qty of store item after buy_item executed
        self.assertEqual(money_after + psychic_item.value * 3, money_before) #check correct money amount
        self.assertEqual(store_qty_after + 3, store_qty_before)  #check store item properly decrements
        trainer_item = self.trainer.items.get(name='Psionic Focus') 
        self.assertEqual(trainer_item.quantity, 3)
        self.trainer.use_item(trainer_item, trainer_poke, 2)
        self.assertEqual(trainer_poke.power, initial_power + 8) #Check no bonus applied
        self.assertEqual(trainer_item.quantity, 1)

        #electric (item bonus) qty 5 use 3
        initial_power = trainer_poke.power
        electric_item = self.trainer.shop.items.get(name='Voltage Amplifier')
        money_before = self.trainer.money
        shop_qty_before = electric_item.quantity
        self.trainer.buy_item(electric_item, 5)
        money_after = self.trainer.money
        self.assertEqual(money_after + electric_item.value * 5, money_before)
        shop_qty_after = electric_item.quantity
        self.assertEqual(shop_qty_after + 5, shop_qty_before)
        trainer_item = self.trainer.items.get(name='Voltage Amplifier')
        self.assertEqual(trainer_item.quantity, 5)
        self.trainer.use_item(trainer_item, trainer_poke, 3)
        self.assertEqual(trainer_poke.power, initial_power + 24)
        self.assertEqual(trainer_item.quantity, 2)

    def test_use_item_defense(self):
        
        self.trainer.make_money(4000)
        
        # ice defense (bonus) default qty
        pokemon = Pokemon.objects.create(name='articuno',types='ice, flying', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        trainer_poke = self.trainer.pokemon.get(name='articuno')
        initial_defense = trainer_poke.defense
        shop_item = self.trainer.shop.items.get(name='Icicle Infusion')
        self.trainer.buy_item(shop_item)
        trainer_item = self.trainer.items.get(name='Icicle Infusion')
        self.trainer.use_item(trainer_item, trainer_poke)
        self.assertEqual(trainer_poke.defense, initial_defense + 6)
        #rock defense (no bonus) qty 3
        initial_defense = trainer_poke.defense
        shop_item = self.trainer.shop.items.get(name='Granite Guard')
        self.trainer.buy_item(shop_item, 3)
        trainer_item = self.trainer.items.get(name='Granite Guard')
        self.trainer.use_item(trainer_item, trainer_poke, 3)
        self.assertEqual(trainer_poke.defense, initial_defense + 9)

        #flying defense (bonus) qty 6
        initial_defense = trainer_poke.defense
        shop_item = self.trainer.shop.items.get(name='Feathered Gale Guard')
        self.trainer.buy_item(shop_item, 6)
        trainer_item = self.trainer.items.get(name='Feathered Gale Guard')
        self.trainer.use_item(trainer_item, trainer_poke, 6)
        self.assertEqual(trainer_poke.defense, initial_defense + 36)


    def test_add_pokemon(self):
        self.trainer.add_pokemon(self.pokemon)
        self.assertEqual(self.trainer.pokemon.count() - 1, self.initial_pokemon_count)

    def test_add_multiple_pokemon(self):
        pokemon = Pokemon.objects.create(name='charmander',types='fire', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        pokemon = Pokemon.objects.create(name='bulbasaur',types='grass', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        pokemon = Pokemon.objects.create(name='squirtle',types='water', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        self.assertEqual(self.trainer.pokemon.count() -3, self.initial_pokemon_count)

    def test_add_remove_multiple_pokemon(self):
        pokemon = Pokemon.objects.create(name='charmander',types='fire', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        self.assertEqual(self.trainer.pokemon.count() -1, self.initial_pokemon_count)

        pokemon = Pokemon.objects.create(name='bulbasaur',types='grass', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        self.assertEqual(self.trainer.pokemon.count() -2, self.initial_pokemon_count)

        pokemon = Pokemon.objects.create(name='squirtle',types='water', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg')
        self.trainer.add_pokemon(pokemon)
        self.assertEqual(self.trainer.pokemon.count() -3, self.initial_pokemon_count)

        pokemon = self.trainer.pokemon.get(name='bulbasaur')
        self.trainer.remove_pokemon(pokemon.id)
        self.assertEqual(self.trainer.pokemon.count() - 2, self.initial_pokemon_count)

        pokemon = self.trainer.pokemon.get(name='squirtle')
        self.trainer.remove_pokemon(pokemon.id)
        self.assertEqual(self.trainer.pokemon.count() - 1, self.initial_pokemon_count)

        pokemon = self.trainer.pokemon.get(name='charmander')
        self.trainer.remove_pokemon(pokemon.id)
        self.assertEqual(self.trainer.pokemon.count(), self.initial_pokemon_count)

    def test_first_pokemon(self):
        self.trainer.first_pokemon()
        self.assertEqual(self.trainer.pokemon.count() - 1, self.initial_pokemon_count)

    def test_enemy_pokemon(self):
        self.trainer.get_enemy_pokemon()
        self.assertEqual(self.trainer.enemy_pokemon.count() - 1, self.initial_enemy_count)

    def test_remove_enemy(self):
        self.trainer.remove_enemy_pokemon()
        self.assertEqual(self.trainer.enemy_pokemon.count(), 0)
    
    def test_replenish_shop(self):
        self.trainer.replenish_shop()
        self.assertEqual(self.trainer.shop.items.count(), 71)
    



    def test_calculate_trainer_power(self):
        self.trainer.first_pokemon()
        self.trainer.calculate_trainer_power()
        self.assertEqual(self.trainer.trainer_power, 3)
        pokemon = Pokemon.objects.create(name='gengar',types='ghost, poison', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg', level=33)
        self.trainer.add_pokemon(pokemon)
        self.trainer.calculate_trainer_power()
        self.assertGreater(self.trainer.trainer_power, 3)

        pokemon = Pokemon.objects.create(name='charizard',types='fire', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg', level=45)
        self.trainer.add_pokemon(pokemon)
        self.trainer.calculate_trainer_power()
        self.assertGreater(self.trainer.trainer_power, 18)

        pokemon = Pokemon.objects.create(name='squirtle',types='water', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg', level=10)
        self.trainer.add_pokemon(pokemon)
        self.trainer.calculate_trainer_power()
        self.assertLess(self.trainer.trainer_power, 27)

    def test_add_enemy_pokemon(self):
        Pokemon.objects.create(name='gengar',types='ghost, poison', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg', level=30)
        Pokemon.objects.create(name='articuno',types='ice, flying', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg', level=50)
        Pokemon.objects.create(name='squirtle',types='water', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg', level=13)
        Pokemon.objects.create(name='bulbasaur',types='grass, poison', front_image_url='something.jpeg', back_image_url='somethingelse.jpeg', level=7)
        self.trainer.first_pokemon()
       
        self.trainer.get_enemy_pokemon()
        self.trainer.add_enemy_pokemon()
        self.assertEqual(self.trainer.pokemon.count(), 2)
        self.assertFalse(self.trainer.enemy_pokemon.exists())

        self.trainer.get_enemy_pokemon()
        self.assertEqual(self.trainer.enemy_pokemon.count(), 1)
        self.trainer.add_enemy_pokemon()
        self.assertEqual(self.trainer.pokemon.count(), 3)
        self.assertFalse(self.trainer.enemy_pokemon.exists())

        self.trainer.get_enemy_pokemon()
        self.assertEqual(self.trainer.enemy_pokemon.count(), 1)
        self.trainer.add_enemy_pokemon()
        self.assertEqual(self.trainer.pokemon.count(), 4)
        self.assertFalse(self.trainer.enemy_pokemon.exists())

    def test_duplicate_enemy_pokemon(self):
        self.trainer.first_pokemon()
        self.trainer.get_enemy_pokemon()
        
        trainer_poke = self.trainer.pokemon.first()
        enemy_poke = self.trainer.enemy_pokemon.first()
        self.assertGreater(len(enemy_poke.moves.all()), 0)

        self.assertEqual(trainer_poke.name, enemy_poke.name) #Check same pokemon name
        self.assertNotEqual(trainer_poke.id, enemy_poke.id) #Check id's are differrent

        self.trainer.add_enemy_pokemon()
        self.assertEqual(self.trainer.pokemon.count(), 2) #Check that pokemon was added
        self.assertFalse(self.trainer.enemy_pokemon.exists()) #Check enemy properly removed

        self.trainer.get_enemy_pokemon()
        self.trainer.add_enemy_pokemon()
        self.assertEqual(self.trainer.pokemon.count(), 3) #Check count continues to add properly
        self.assertFalse(self.trainer.enemy_pokemon.exists()) #Check remove clears enemy pokemon

        for _ in range(20):
            self.trainer.get_enemy_pokemon()
            self.trainer.add_enemy_pokemon()
        final_trainer_power = self.trainer.trainer_power
        self.assertGreater(final_trainer_power, self.initial_trainer_power)
        self.assertEqual(self.trainer.pokemon.count(), 23)
        final_trainer_power = self.trainer.trainer_power
       
        # all_trainer_pokes = self.trainer.pokemon.all()
        # for pokemon in all_trainer_pokes:
        #     print(pokemon.name, pokemon.level, pokemon.experience, pokemon.totalXP, pokemon.id)
        #     print(pokemon.health, pokemon.max_health, pokemon.power, pokemon.defense)
        #     print(pokemon.moves.all())

        


        




    







    
        




