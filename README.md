[![Build Status](https://travis-ci.org/savantly-net/sprout-platform.svg?branch=master)](https://travis-ci.org/savantly-net/sprout-platform)  master

[![Build Status](https://travis-ci.org/savantly-net/sprout-platform.svg?branch=development)](https://travis-ci.org/savantly-net/sprout-platform)  development


# sprout-platform  

This project provides a headless CMS with a built-in admin UI for managing content types and items.  
It's extendable with plugin-modules, and aims to be an alternative wherever Wordpress may be considered.  

If there is specific feature you'd like, or if you experience a bug, please open an issue [here](https://github.com/savantly-net/sprout-platform/issues)  

Please consider contributing through [Patreon](https://www.patreon.com/savantly) or PRs  

I believe the Open Source community needs an enterprise grade CMS that's flexible enough for any project starter.  
Help me create that! 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/Savantly)  

Sprout platform is currently being refactored to leverage the latest libraries and practices. 
The development branch may be unstable until this is complete.  
Follow this project to stay informed.  

#### Check out the [Demo App](https://sprout-garden.herokuapp.com/)


### Quick Start  

Use the docker images to start an example server + web app.  
`docker-compose up`  

### Development 
- Clone this project 
- Run `./gradlew :server:bootRun` from the base directory of the project to start the server 
- Open http://localhost:8080/admin to access the backend application  

You can override properties by modifying the `application.properties`    
[See here for more info.](./starters/sprout-spring-boot-starter/src/main/resources/)  

Read more about the [Sprout Starter](./starters/sprout-spring-boot-starter)



Demo images coming soon.
