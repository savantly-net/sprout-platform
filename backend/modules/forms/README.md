# Forms Module for Sprout

A Sprout Module that provides Form Management.  

This library uses the Formio React library, and implements a partial Formio server in Java.


## Dev Quickstart
Checkout the source code, and from the project root -  

- build the project  
`./gradlew build`  

- start the dev sprout server  
`./gradlew :sprout-modules-forms:dev`  
The server is now running on `localhost:8080`  
Spring Dev tools are used, to hot reload any application code changes without restarting the server.  

- start the dev web server -  
`rush start`  
The web server is now running on `localhost:3000`  

- optionally start watching the client side code for changes  
- `cd backend/modules/forms/`
- `yarn watch`  

If client code changes are made, the files are re-packed and the sprout test server makes them immediately available, so you may just refresh the browser to see the updates.  


## Docker 
You can start a fullly functional platform by using the included docker-compose.yml file.  
First build the module -  
`.gradlew :sprout-modules-forms:build`  

The build jar file is mounted in the sprout server through a docker volume -  
`./build/lib/<module>.jar`  

The following services are available -  

| Service | Location |
|- |- |
| Posgres | localhost:5432|
| Sprout Server | http://localhost:8080 |
| Sprout Web | http://localhost:3000 |
| Adminer [DB UI] | http://localhost:8081 |

