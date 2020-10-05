[![Build Status](https://travis-ci.org/savantly-net/sprout-platform.svg?branch=master)](https://travis-ci.org/savantly-net/sprout-platform)  master

[![Build Status](https://travis-ci.org/savantly-net/sprout-platform.svg?branch=development)](https://travis-ci.org/savantly-net/sprout-platform)  development


# sprout-platform  

This project provides a headless CMS with a built-in admin UI for managing content types and items.  
It's extendable with plugin-modules, and aims to be an alternative wherever Wordpress may be considered.  

The platform has gone through several iterations - AngularJS, Angular 2/4/6, and now React.  
I got lots of inspiration [and code] from the Grafana UI + toolkit for this latest iteration.  

I'd love to get some input from the community!  

If there is specific feature you'd like, or if you experience a bug, please open an issue [here](https://github.com/savantly-net/sprout-platform/issues)  

Please consider contributing through PRs or [Patreon](https://www.patreon.com/savantly)  

I believe the Open Source community needs an enterprise grade CMS that's flexible enough for any project starter.  
Help me create that! 

[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/Savantly)  

Sprout platform is currently being refactored to leverage the latest libraries and practices. 
The development branch may be unstable until this is complete.  
Follow this project to stay informed.  


## Quick Start  

Use the docker images to start an example server + web app.  
`docker-compose up`  

## Development 
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

The built-in admin app was being re-done in React, but I may drop it in favor of a single UI with all the administration functions included.  
The UI could then be packaged with the server app to run as a single Java deployment.  
Although, with CORs configured, the UI can easily be deployed to a static site server with the server app on a cloud provider like Heroku or AWS.   

The main backend code is located in the Sprout Starter project.  
Read more about the [Sprout Starter](./starters/sprout-spring-boot-starter)

The UI is in a `yarn` workspace project here [./web/sprout-react/packages/webapp](./web/sprout-react/packages/webapp)  

The toolkit from Grafana has been used to setup the dependencies.  
It doesn't support all the same features as Grafana, and the plugin bootstrapping is still progress.  

## UI work

The port from Grafana UI went like this - 
- Copy the UI project into my workspace
- Rip all the time-series related stuff out [woah!!!] =)
- Rip all the Angular stuff out [oh man... so many red squiggly lines in my IDE]
- Rip half my hair out
- Rip out cool features that I don't have time to port right now =(
- Monkey patch about 200 files
- Rip the other half of my hair out
- Connect the 'home' dashboard request to the server, and provide some mock data
- Build some docker images. woohoo!


## Examples

![Sprout Web App](./docs/img/default.png)


![Sprout Web App](./docs/img/panel_edit.png)

## TODO
This list is not comprehensive, but some high level tasks I'd like to tackle soon. 

[ ] Add a code editor to the Standard Editors [port Monaco stuff from Grafana?]
[ ] Add Authentication screens to UI
[ ] Add lots of tests
[ ] Add server hook for all the boot data the UI expects [in progress]

