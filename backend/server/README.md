# Sprout Server

## Development

Start the DB and web server using Docker Compose  

From the root of the project -  

```
docker compose -f backend/server/docker-compose.yml up 
```

In another terminal, start the Sprout Server in dev mode  

```
./gradlew :sprout-server:dev 
```
