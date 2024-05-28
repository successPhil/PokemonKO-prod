export POSTGRES_DB=$POSTGRES_DB
export POSTGRES_USER=$POSTGRES_USER
export POSTGRES_PASSWORD=$POSTGRES_PASSWORD
export DB_HOST=$DB_HOST
export DB_PORT=$DB_PORT

COMPOSE_DOCKER_CLI_BUILD=0 DOCKER_BUILDKIT=0 docker compose -f docker-compose.dev.yml up -d --build

# make sure the postgres container is ready, then run migrations
sleep 10
docker exec pokemonko-prod-api-1 python /src/manage.py makemigrations 
docker exec pokemonko-prod-api-1  python /src/manage.py migrate
docker exec pokemonko-prod-api-1 python /src/manage.py loaddata pokemon_data
docker exec pokemonko-prod-api-1 python /src/manage.py loaddata moves_data