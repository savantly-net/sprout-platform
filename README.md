[![Build Status](https://travis-ci.org/savantly-net/sprout-platform.svg?branch=master)](https://travis-ci.org/savantly-net/sprout-platform)  master

[![Build Status](https://travis-ci.org/savantly-net/sprout-platform.svg?branch=development)](https://travis-ci.org/savantly-net/sprout-platform)  development


# sprout-platform  

This project provides a headless CMS with a built-in admin UI for managing content types and items.  
It's extendable with plugin-modules, and aims to be an alternative wherever Wordpress may be considered.  

I got lots of inspiration [and code] from the Grafana UI + toolkit.  

If there is specific feature you'd like, or if you experience a bug, please open an issue [here](https://github.com/savantly-net/sprout-platform/issues)  

Please consider contributing through PRs or [Patreon](https://www.patreon.com/savantly)  

I believe the Open Source community needs an enterprise grade CMS that's flexible enough for any project starter.  
Help me create that! 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/Savantly)  

Sprout platform is currently being refactored to leverage the latest libraries and practices. 
The development branch may be unstable until this is complete.  
Follow this project to stay informed.  


### Quick Start  

Use the docker images to start an example server + web app.  
`docker-compose up`  

### Development 
If you're a Java, React, or Grafana developer, you'll be familiar with the tooling. 

The UI was bootstrapped using `create-react-app`  
The backend uses `gradle` + `Spring Boot`  

- Clone this project 
- Run `./gradlew :server:bootRun` from the base directory of the project to start the server 
- Open http://localhost:8080/admin to access the backend application  

You can override properties by modifying the `application.properties`    
[See here for more info.](./starters/sprout-spring-boot-starter/src/main/resources/)  

The backend server is developed as a `Spring Boot Starter` so it can be added to any Spring app to bootstrap with defaults.  
It's not production ready yet, but should be by Q1 2021.  

Read more about the [Sprout Starter](./starters/sprout-spring-boot-starter)


![Sprout Web App](./docs/img/default.png)


![Sprout Web App](./docs/img/panel_edit.png)
