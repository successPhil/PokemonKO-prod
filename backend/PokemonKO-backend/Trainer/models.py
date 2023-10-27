from django.contrib.auth.models import User
from django.db import models
from pokemon.models import Pokemon
from Items.models import Item
from Shop.models import Shop
from Shop.views import create_initial_shop
from moves.models import Move
import random

class Trainer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    money = models.IntegerField(default=500)
    trainer_power = models.IntegerField(default=3)
    pokemon = models.ManyToManyField(Pokemon, related_name='trainer_pokemon', blank=True, default=None)
    items = models.ManyToManyField(Item, related_name='trainers_items', default=None, blank=True)
    shop = models.OneToOneField(Shop, on_delete=models.CASCADE, default=None, null=True)
    enemy_pokemon = models.ManyToManyField(Pokemon, related_name='enemy_pokemon', blank=True, default=None)

#Setting up initial shop for Trainer
    def set_initial_shop(self):
        if self.shop is None:
            initial_shop = create_initial_shop()  # Call the method to create initial shop
            self.shop = initial_shop
            self.save()

    def replenish_shop(self):
        if self.shop:
            self.shop.replenish_items()
            self.save()

    def make_money(self, amount):
        self.money += amount

    def calculate_trainer_power(self):
        total_levels = 0
        total_pokemon = self.pokemon.count()

        if total_pokemon > 0:
            for pokemon in self.pokemon.all():
                total_levels += pokemon.level
            average_level = total_levels / total_pokemon
            self.trainer_power = int(average_level)
            self.save()
    
    def list_items(self):
        items = self.items.all()
        items_list = []
        for item in items:
            item_details = {
                "name": item.name,
                "value": item.value,
                "stat_boost": item.stat_boost,
                "item_class": item.item_class,
                "quantity": item.quantity
            }
            items_list.append(item_details)
        return items_list
    
    def list_shop(self):
        items = self.shop.items.all()
        items_list = []
        for item in items:
            item_details = {
                "name": item.name,
                "value": item.value,
                "stat_boost": item.stat_boost,
                "item_class": item.item_class,
                "quantity": item.quantity
            }
            items_list.append(item_details)

        return items_list
    
    def sell_item(self, item, qty=1):
        try:
            shop_item = self.shop.items.get(name=item.name)
        except Item.DoesNotExist:
            #If item does not exist in store create it
            shop_item = Item.objects.create(
                name=item.name,
                value=item.value,
                stat_boost=item.stat_boost,
                item_class=item.item_class,
                quantity=0
            )
            self.shop.items.add(shop_item) #add shop_item to shop items

        if item.quantity >= qty > 0:
            sale_price = item.value * qty
            self.money += sale_price
            item.decrement_quantity(qty) #Decrease trainer item quantity
            shop_item.increment_quantity(qty) #Increase shop item quantity
            self.save()

        #     print(f'Sold {qty} {item.name}(s) for {sale_price} money')
        # else:
        #     print(f'Not enough {item.name} to sell')

    def buy_item(self, item, qty=1):
        try:
            trainer_item = self.items.get(name=item.name)
        except Item.DoesNotExist:
            trainer_item = Item.objects.create(
                name=item.name,
                value=item.value,
                stat_boost=item.stat_boost,
                item_class=item.item_class,
                item_type=item.item_type,
                quantity=0
            )
            self.items.add(trainer_item)
            self.save()
        if item.quantity >= qty > 0:
            sale_price = item.value * qty
            if self.money >= sale_price:
                self.money -= sale_price
                trainer_item.increment_quantity(qty)
                item.decrement_quantity(qty)
                item.save()
                self.save()
        #         print(f'Purchased {qty} {item.name}(s) for {sale_price} money')
        #     else:
        #         print(f'Not enough money to purchase {qty} {item.name}')
        # else:
        #     print(f'Not enough {item.name} in stock')

    def use_item(self, item, pokemon, qty=1):
        item_map = {
            'health': pokemon.increase_health,
            'maxhealth': pokemon.increase_max_health,
            'damage': pokemon.increase_power,
            'defense': pokemon.increase_defense
        }
        type_bonus = 2 if item.item_type in pokemon.types else 1
        item_function = item_map.get(item.item_class)
        if item_function:
            item_function(item.stat_boost * qty * type_bonus)
            item.decrement_quantity(qty)


    def add_pokemon(self, pokemon):
        self.pokemon.add(pokemon)
        self.save()
    
    def first_pokemon(self):
        if not self.pokemon.exists():
            all_pokemon = Pokemon.objects.all()
            pokemon_choice = random.choice(all_pokemon)
            self.add_pokemon(pokemon_choice)
            self.save()

    def handle_duplicate_pokemon(self, original_pokemon):
        new_enemy_pokemon = Pokemon(
            name=original_pokemon.name,
            types=original_pokemon.types,
            front_image_url=original_pokemon.front_image_url,
            back_image_url=original_pokemon.back_image_url,
            health=original_pokemon.health,
            max_health=original_pokemon.max_health,
            power=original_pokemon.power,
            defense=original_pokemon.defense,
            experience=original_pokemon.experience,
            totalXP=original_pokemon.totalXP,
            level=original_pokemon.level
        )
        new_enemy_pokemon.save()

        all_moves = Move.objects.all()
        random_moves = random.sample(list(all_moves), 4)
        new_enemy_pokemon.moves.set(random_moves)
        new_enemy_pokemon.save()

        return new_enemy_pokemon
    
    def level_up_enemy(self, pokemon, level_diff):
        while level_diff > 0:
            levelXP = pokemon.totalXP - pokemon.experience
            pokemon.gain_experience(levelXP)
            level_diff -= 1
        pokemon.save()

    
    def get_enemy_pokemon(self):
        if not self.enemy_pokemon.exists():
            trainer_power = self.trainer_power
            min_level = max(3, trainer_power-3)
            new_level = random.randint(min_level, trainer_power + 3)
            all_pokemon = Pokemon.objects.all()
            pokemon_choice = random.choice(all_pokemon)
            level_difference = new_level - pokemon_choice.level


            if self.pokemon.filter(id=pokemon_choice.id).exists():
                new_enemy_pokemon = self.handle_duplicate_pokemon(pokemon_choice)
                level_difference = new_level - new_enemy_pokemon.level
                self.level_up_enemy(new_enemy_pokemon, level_difference)
                new_enemy_pokemon.save()
                self.enemy_pokemon.add(new_enemy_pokemon)
            else:
                self.level_up_enemy(pokemon_choice, level_difference)
                pokemon_choice.save()
                self.enemy_pokemon.add(pokemon_choice)
            
            self.save()

    def add_enemy_pokemon(self):
        if self.enemy_pokemon.exists():
            enemy_pokemon = self.enemy_pokemon.first()
            self.add_pokemon(enemy_pokemon)
            self.enemy_pokemon.clear()
            self.calculate_trainer_power()
            self.save()

    def remove_enemy_pokemon(self):
        if self.enemy_pokemon.exists():
            self.enemy_pokemon.clear()
            self.save()

    def trainer_run(self):
        self.remove_enemy_pokemon()
        self.get_enemy_pokemon()
        self.save()

    def remove_pokemon(self, pokemon_id):
        try:
            pokemon_obj = self.pokemon.get(id=pokemon_id)
            self.pokemon.remove(pokemon_obj)
            self.calculate_trainer_power()
            self.save()
            return True
        except Pokemon.DoesNotExist:
            return False
                    



