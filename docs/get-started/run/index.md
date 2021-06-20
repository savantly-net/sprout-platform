---
title: "Download and run"
description: Learn how to run Sprout
---

## Docker Compose 
The fastest way to run Sprout, is to use Docker-Compose to start up a  preconfigured webapp + server.   

Check out the `docker-compose.yml` file in the source code root to start a preconfigured Sprout Server + Web app 
 
`docker-compose up`  

The example server creates a user -  
username: admin  
password: changeme!  

Access the web application at `http://localhost:3000`  


Or copy this and modify it to create your own `docker-compose.yml` file locally -   

```
version: "3"
services:

  server:
    image: savantly/sprout-server:edge
    container_name: example_sprout_server
    environment: 
      - PORT=9090
      - SPRING_DATASOURCE_URL=jdbc:postgresql://sprout_db:5432/postgres
      - SPRING_DATASOURCE_USERNAME=sprout
      - SPRING_DATASOURCE_PASSWORD=sprout
      - SPRING_DATASOURCE_DRIVER_CLASS_NAME=org.postgresql.Driver
      - SPRING_JPA_DATABASE_PLATFORM=org.hibernate.dialect.PostgreSQLDialect
    ports:
      - 8080:9090
    depends_on: 
    - sprout_db

  webapp:
    image: savantly/sprout-webapp:edge
    container_name: example_sprout_webapp
    ports:
      - 3000:4000
    environment: 
      - PORT=4000
      - SPROUT_API_URL=http://server:9090

  db:
    container_name: sprout_db
    image: postgres
    environment:
      - POSTGRES_PASSWORD=sprout
      - POSTGRES_USER=sprout
```