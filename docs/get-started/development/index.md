---
title: Sprout Development
description: Learn how to develop and contribute to the Sprout Platform
---

If you're a Java, React, or Grafana developer, you'll be familiar with the tooling. 

The UI was bootstrapped using `create-react-app`  
The backend uses `gradle` + `Spring Boot`  

The component library is made of general React components that can be used in your own React application.  
`npm install @sprout-platform/ui`  
Storybook is used to document and demo the UI component library.  
It's published [here](https://master--5f96ec613d800900227e3b76.chromatic.com)  

To get started developing Sprout -  
- Clone this project 
- Run `./gradlew :sprout-server:bootRun` from the base directory of the project to start the server 
- Open http://localhost:8080/ to access the backend application  

You can override properties by modifying the `application.properties`    
[See here for more info.](./backend/starters/sprout-spring-boot-starter/src/main/resources/)  

The backend server is developed as a `Spring Boot Starter` so it can be added to any Spring app to bootstrap with defaults.  
It's not production ready yet, but should be by Q1 2021.  

The main backend code is located in the Sprout Starter project.  
Read more about the [Sprout Starter](./backend/starters/sprout-spring-boot-starter)

The front-end uses the [Rush Stack](https://rushstack.io/) for build orchestration. [./frontend/apps/webapp](./frontend/apps/webapp)  

To build the front-end -  
```bash
# from the project root
rush update
rush build
```

To start the front-end app -  
```bash
rush start
``` 

To add a dependency to a front-end project - 
```bash
cd ./frontend/<project sub dir>
rush add -p @scoped/package
```


The toolkit from Grafana has been used to setup the dependencies.  
It doesn't support all the same features as Grafana, and the plugin bootstrapping is still progress.  