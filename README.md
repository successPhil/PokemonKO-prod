# Pokemon KO
# Introduction
"Pokemon KO" is a web application that presents a unique twist on the classic Pokémon adventure. In this altered reality, pokéballs no longer function as they should, resulting in chaos. In this game pokémon will only be captured if they are defeated in battle... if your pokémon is ever defeated in battle, that pokémon run and never fight for you again! Don't worry, you will have items to help you deal with this just don't ever let your pokémon down!
# Features

# Pokémon: 
View all of your pokemon as a trainer! You can filter by name, power, or a specific type of pokemon! Additionally each pokemon will display a list of their moves! Each move will have a type and a damage, that are chosen at random for each pokémon. While viewing your pokémon, you may SELECT POKÉMON on any of your pokémon. This is how you will select a pokémon for battle, or change a selected pokémon during battle.

# Battle: 
Battle against enemy pokemon for a chance to beat them in battle. Whenever an enemy pokémon is defeated in battle, it will become added to your inventory of pokémon! However, whenever one of your pokémon is defeated.. That pokémon will no longer fight for you or be a pokémon in your inventory! So remember to use the shop frequently, use items often, and consider the counters to your pokémon!
# Shop: 
Each Trainer has a shop, and inside that shop are Items that can be purchased with Pokemon KO coins. KO coins are earned from winning battles against enemy pokémon. Shop inventory items are initially set to 10 quantity per item. While battling, there is a chance every time a new enemy pokémon is engaged to reset the shop inventory items to quantity 10 for every item in the store.

Additionally the Shop is where a trainer can view the amount of KO coins they have earned.

# Items: 
View your inventory of items that can be used on your selected pokémon. Each trainer is initially given some HP Potions, but after that they will have to rely on the store for keeping pokémon healed. Items can be used outside of battle to heal up pokémon before encountering an enemy pokémon. 

# Authentication and Authorization: 
Secure user authentication and authorization. Ensuring each user is provided a unique pokémon experience


# Getting Started

# Note:
It is a known issue that when the game is initially launched, a user does not receive a pokémon and cannot fetch enemy pokémon. This has to do with the database being created and seeded for the first time. Essentially the first time the application is ran, it will take some time to get pokémon at first. If the local or production version you are launching is not using an existing volume for the database, try refreshing the pokémon page after about 1 minute.

This problem should only apply to the first user created. All subsequent users should quickly recieve and get enemy pokémon once the initial database has been created.


To get started with Pokemon KO, follow these steps:

# Local
After you have forked the or cloned the repository run the dev shell script:
Example: ./run-compose-dev.sh

Once the containers finish building you should be able to access the game locally at port 80.

# Production
After you have forked the or cloned the repository follow these steps and update the scripts appropriately:
1. build-and-push-images.sh
To run this in production, you need to change the DOCKERHUB_UNAME to your dockerhub username.
You then need to provide the EC2 address, and the version of the images you are building for the application.
Example: ./build-and-push-images.sh 123.456.00.1 1
where 123.456.00.1 is our imaginary EC2 container addresss, and 1 is the version of the image we are building because we have never built one

2. Inside the EC2 instance
Inside your EC2 instance, you will need to run the run-compose-prod.sh script.
Make sure to change DOCKERHUB_UNAME to your dockerhub username.
When you run the script you need to provide the appropriate environmental variables:
Example: ./run-compose-prod.sh abc123 False poke_db postgres postgres 1
Where 1 is the version of the images built in step 1.
This should ensure that when the script runs, your docker images are pulled with the correct code that you have made changes to.


Acknowledgements
The Pokemon franchise for inspiring this unique take on the Pokemon world.
The developers of the PokeAPI
Contributors and developers at https://www.pokemonaaah.net/artsyfartsy/fonts/ for the fan influenced fonts
Contributors to open-source libraries and frameworks used in this project.


