# sprout-platform  
Platform Build  
![CI](https://github.com/savantly-net/sprout-platform/workflows/CI/badge.svg)  
Sprout Core  
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_core&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_core) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_core&metric=security_rating)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_core) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_core&metric=coverage)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_core)  
Sprout Spring Boot Starter  
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_starter&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_starter) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_starter&metric=security_rating)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_starter) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_starter&metric=coverage)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_starter)  
Sprout Server  
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_server&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_server) [![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_server&metric=security_rating)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_server) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=savantly-net_sprout-platform_server&metric=coverage)](https://sonarcloud.io/dashboard?id=savantly-net_sprout-platform_server)


This software uses an Open Source Initiative approved license.  
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)  
![Sprout Web App](./docs/img/favicon.png) ![Open Source Initiative](./docs/img/osi_standard_logo_small.png)


## What is Sprout?  
Sprout is a web application framework, different than the dozens that already exist.  
Similar to Ruby on Rails, Laravel, Django, and others - it facilitates rapid development of a web application.  
- Provides default configurations  
- Uses conventions and standards to develop and debug faster  

Similar to WordPress.  
- You can use the Sprout Server Docker image as a "no code" solution  
- Custom css or third party plugins/modules can be added without recompiling the server.  

Similar to other headless CMS.  
- It's 'head optional'.  
  The provided UI is a stand-alone ReactJS application, but there's no requirement to use it.  
  
Sprout is different than other frameworks -  
- You can use it as an application dependency  
  Adding Sprout Starter to your Spring project allows customization, replacing default components, extend provided functionality, or turn off capabilities.
- Non-Intrusive  
  Sprout can be replaced or removed with less effort than other frameworks due to abstractions.  
  You can use Sprout to standup a project, then replace implementations until it is no longer required.

## Why not code generation? 
Code generation has applicable use cases, but applications built on generated code can be difficult to update especially with customizations.  
With Sprout as a dependency, customizations and modules are abstracted from the core application code, so you can update it like any other application dependency.  

## Use Cases
The Sprout Platform provides an extensible and modular application platform, so it's suitable for custom CMS, line-of-business, application portals, or other types of apps.  
The modular design allows closed-source customizations to be applied for each unique case.  

The development is currently sponsored by a rapidly growing restaurant franchise, using it as a "Enterprise Portal", where they can bring together disparate systems.  
It's also being used as a line-of-business application to manage entities and data attributes, such as franchise location information, QA, and BI administration.  

Please contact support@savantly.net if you are interested more in this use case.


## Documentation  
[Go here for full documentation](https://sprout-platform.web.app/)  

The front-end UI uses a `plugin` system to add or modify functionality.  
[Read more about the front-end](./frontend/)  

The back-end server uses a `module` system to add or modify functionality. A `module` may also provide `plugins` to the UI.  
[Read more about the back-end](./backend/)  

You may notice, inspiration [and some code] for the user-interface came from Grafana - an excellent dashboard application.

If there is a specific feature you'd like, or if you experience a bug, please open an issue [here](https://github.com/savantly-net/sprout-platform/issues)  

If you're a develper, PRs are welcome!  
If not, you can support this project by becoming a GitHub Project Sponsor, or through [Patreon](https://www.patreon.com/savantly),  or PayPal
[![paypal](https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif)](https://paypal.me/Savantly)  


## Quick Start  

Use the docker images to start an example server + web app.  
`docker-compose up`  

The example server creates a user -  
username: admin  
password: changeme!  

## Development 

*Required Software*
- [node js](https://nodejs.org/en/download/)
- [rush js](https://rushjs.io/)
- [JDK 8+](https://adoptopenjdk.net/installation.html)

If developing on Windows, it's recommended to use WSL2 with Docker Desktop  
[Install Docker Desktop and WSL2](https://docs.docker.com/desktop/windows/wsl/)
Be sure to read the section about [using vscode from inside linux](https://docs.docker.com/desktop/windows/wsl/#develop-with-docker-and-wsl-2)

### Frontend Development 

If this is the first time you're running sprout, run the following commands:

```
rush update
rush build

```

#### Remote backend
If running the backend remotely, you may set the environment variable `SERVER_API_URL` to the sprout api host. 
Example using the demo server - 
```
# *nix
export SERVER_API_URL=https://sprout-server.herokuapp.com/
# windows
SET SERVER_API_URL=https://sprout-server.herokuapp.com/
```

#### Local backend
You can also run the backend locally
From the root of the project -  
Start the DB and Sprout Server using Docker Compose  

```
docker compose -f docker/frontend-dev.yml up
```

#### Start frontend dev server
In another terminal start the web app -  

```
rush start:web
```

Open the browser to http://localhost:3000  to access the web application.  
Use the login `admin` with password `changeme!` 

Changes to the React app source code will reload the browser automatically.  

The web app source code is located here -  [./frontend/apps/webapp](./frontend/apps/webapp)


### Full Stack Development

From the root of the project -  
Start the DB using Docker Compose  

```
docker compose -f backend/server/docker-compose.yml up 
```

Optionally, in another terminal, run continuous compilation for the sprout-spring-boot-starter Java project -  

```
rush start:dev-watch
```

In another terminal, start Sprout in dev mode -  

```
rush start:dev
```

If this is the first time you're running sprout, run the following commands:

```
rush update
rush build

```

In another terminal start the web app -  

```
rush start:web
```


## Examples

### Live Server Demo  
- username: admin  
- password: changeme!  

[https://sprout-server.herokuapp.com/](https://sprout-server.herokuapp.com/)  

### Live Client Demo
- username: admin  
- password: changeme!  

[https://sprout-web.herokuapp.com/](https://sprout-web.herokuapp.com/)  


### Screenshots 

#### Default Website Landing Page

![Sprout Web App](./docs/img/default.png)  

#### Editing a Panel 

![Editing a Panel](./docs/img/examples/dashboards.gif)

#### Panel Editor

![Sprout Web App](./docs/img/panel_edit.png)  

#### File/Document Management

![Editing a Panel](./docs/img/examples/file-manager.gif)


## Build/Release  

See the [./scripts/](./scripts)