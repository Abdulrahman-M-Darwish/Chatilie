# Chatilie

Just a social media app made for fun "still on dev"

## How to use

First you need to have docker, docker compose and pnpm installed on your machine

Second fill the example.env in the server dir then rename it to .env

Third to run the application run:

for development: docker-compose -f docker-compose.yaml -f docker-compose.development.yaml -f docker-compose.elasticsearch.yaml up

for production: docker-compose -f docker-compose.yaml -f docker-compose.production.yaml -f docker-compose.elasticsearch.yaml up

the server will not work in the first time to make it work go to http://localhost:5601/app/management/security/api_keys after running the app then make api key and paste it in the ELASTICSEARCH_API_KEY in the server env then the app will work fine

you can access the client on: http://localhost:3000

you can access the server on: http://localhost:8080
