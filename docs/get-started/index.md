---
title: "Orientation and setup"
keywords: get started, setup, orientation, quickstart, intro, concepts, containers, sprout
description: Get oriented on some basics of Sprout
---

This software uses an Open Source Initiative approved license.  
![Open Source Initiative](/img/osi_standard_logo_small.png)

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


## Quick Start  

Use the docker images to start an example server + web app.  
[Docker Compose File](https://github.com/savantly-net/sprout-platform/blob/master/docker-compose.yml)  

`docker-compose up`  

The example server creates a user -  
username: admin  
password: changeme!  


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

#### Default Home Dashboard

![Sprout Web App](/img/default.png)  

#### Editing a Dashboard Panel

![Sprout Web App](/img/panel_edit.png)  