# Sprout Server

## Development

Start the DB using Docker Compose  

From the root of the project -  

```
docker compose -f backend/server/docker-compose.yml up 
```

In another terminal, start the Sprout Server in dev mode -  

```
./gradlew :sprout-server:dev 
```

In another terminal start the web app -  

```
rush start
```