from rest_framework.test import APITestCase
from rest_framework import status
from Trainer.models import Trainer
from pokemon.models import Pokemon

class test_pokemon(APITestCase):
    def setUp(self):
        url = '/login/signup'  #url for signup view
        data = {
            "username": "testuser3",
            "password": "testpassword3"
        }
        #use client to make post to url with data
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response = self.client.post('/login/get-token', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('token', response.data)
        self.token = self.client.credentials(HTTP_AUTHORIZATION='Token ' + response.data['token'])


        self.pokemon = Pokemon(name='bulbasaur', types='grass', front_image_url='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png', back_image_url='https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png')
        self.initial_health = self.pokemon.health
        self.initial_max_health = self.pokemon.max_health
        self.initial_power = self.pokemon.power
        self.initial_defense = self.pokemon.defense
        self.initial_level = self.pokemon.level
        self.initial_exp = self.pokemon.experience
        self.initial_totalXP = self.pokemon.totalXP

    def test_initial_data_fetch(self):
        response = self.client.get('/api/pokemon/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(len(response.data) > 0)
    

    def test_multiple_requests_to_api(self):
    # First request
        response_1 = self.client.get('/api/pokemon/')
        self.assertEqual(response_1.status_code, status.HTTP_200_OK)
        data_1 = response_1.data

        # Second request
        response_2 = self.client.get('/api/pokemon/')
        self.assertEqual(response_2.status_code, status.HTTP_200_OK)
        data_2 = response_2.data

        # Check if data from both requests is the same
        self.assertEqual(data_1, data_2)
    def test_decrease_health(self):
        self.pokemon.decrease_health(30)
        current_health = self.pokemon.health
        self.assertEqual(self.initial_health - 30, current_health) #Check that health has properly changed
        current_max_health = self.pokemon.max_health
        self.assertEqual(current_max_health - 30, current_health) #Check that max health has not changed
        self.assertEqual(self.initial_max_health, current_max_health) #Check that max health has not changed

    def test_increase_health_not_missing(self):
        self.pokemon.increase_health(400)
        current_health = self.pokemon.health
        current_max_health = self.pokemon.max_health
        self.assertEqual(self.initial_health, current_health) #Check that health did not change (0 to heal)
        self.assertEqual(current_max_health, self.initial_max_health) #Check max health has not been altered
        self.assertEqual(current_health, self.initial_max_health) #Check current and max health have not changed

    def test_increase_health_full_heal(self):
        self.pokemon.decrease_health(50)
        current_health = self.pokemon.health
        self.assertEqual(self.initial_max_health - 50, current_health) #Check health is 50 less than max_health
        self.pokemon.increase_health(25)
        current_health = self.pokemon.health
        current_max_health = self.pokemon.max_health
        self.assertEqual(self.initial_max_health, current_max_health) #Check max health has not changed
        self.assertEqual(self.initial_health-current_health, 25) #Check final health difference is correct
        self.assertEqual(self.initial_max_health - 25, current_health) #Check that health is 25 lower than max health

    def test_increase_health_partial_heal(self):
        self.pokemon.decrease_health(15)
        current_health = self.pokemon.health
        self.assertEqual(self.initial_health - 15, current_health) #Check health decreases
        self.pokemon.increase_health(35)
        self.assertNotEqual(current_health + 35, self.pokemon.health) #Check we do not over heal
        current_health = self.pokemon.health
        self.assertEqual(self.initial_health, current_health) #Check that full health has not changed

    def test_increase_max_health(self):
        self.pokemon.increase_max_health(45)
        current_max_health = self.pokemon.max_health
        self.assertEqual(current_max_health - 45, self.initial_max_health)

    def test_increase_power(self):
        self.pokemon.increase_power(30)
        current_power = self.pokemon.power
        self.assertEqual(current_power - 30, self.initial_power)

    def test_increase_defense(self):
        self.pokemon.increase_defense(15)
        current_defense = self.pokemon.defense
        self.assertEqual(current_defense - 15, self.initial_defense)

    def test_level_up(self):
        self.pokemon.level_up()
        self.assertEqual(self.pokemon.level, self.initial_level +1)
    
    def test_gain_experience(self):
        self.pokemon.gain_experience(60)
        self.assertEqual(self.pokemon.level, self.initial_level + 1)
        self.assertEqual(self.pokemon.experience, 0)
        self.assertGreater(self.pokemon.totalXP, 60)

    def test_gain_experience_overlevel(self):
        self.pokemon.gain_experience(69)
        self.assertEqual(self.pokemon.level, self.initial_level + 1)
        self.assertEqual(self.pokemon.experience, 9)
        self.assertGreater(self.pokemon.totalXP, 60)

    def test_gain_experience_largeamount(self):
        self.pokemon.gain_experience(2600000)
        self.assertEqual(self.pokemon.level, self.initial_level + 97)






    

    


    
