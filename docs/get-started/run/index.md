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
    ports:
      - 8080:9090

  webapp:
    image: savantly/sprout-webapp:edge
    container_name: example_sprout_webapp
    ports:
      - 3000:4000
    environment: 
      - PORT=4000
      - SPROUT_API_URL=http://server:9090
```