#!/bin/sh

# Set environment variables
export SECRET_KEY=$SECRET_KEY
export PRODUCTION=False
export POSTGRES_DB=$POSTGRES_DB
export POSTGRES_USER=$POSTGRES_USER
export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
export DB_HOST=db
export DB_PORT=5432

# Start containers
COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker compose -f docker-compose.dev.yml up -d --build

# Ensure the postgres container is ready before running migrations
sleep 10

# Run migrations and load initial data
docker exec $(docker ps -q -f name=pokemonko_api) python /src/manage.py makemigrations
docker exec $(docker ps -q -f name=pokemonko_api) python /src/manage.py migrate
docker exec $(docker ps -q -f name=pokemonko_api) python /src/manage.py loaddata pokemon_data
docker exec $(docker ps -q -f name=pokemonko_api) python /src/manage.py loaddata moves_data
