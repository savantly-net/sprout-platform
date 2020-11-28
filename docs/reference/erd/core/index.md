---
title: Core ERDs
description: Entity Relationship Document for Sprout-Core
keywords: sprout-core, domain, erd
---

Sprout-core is the lower level API that doesn't have web server dependencies.  
Core Entities, Repositories, and Services are provided for higher abstractions.   


<hr/>

### Entities  
![sprout-core domain erd](/img/erd/core-domain.png)  

<hr/>

### Services  
Only the custom repository methods are shown here, but each repository includes standard `CRUD` and in some cases paged queries.  
![sprout-core services erd](/img/erd/core-services.png)  

<hr/>

### Module/Plugin   
A `SproutModule` provides server functionality, and a `SproutWebModule` provides specialized functionality for a web environment, such as plugin(s) for the user interface.    
![sprout-core app module erd](/img/erd/core-module.png)  

<hr/>

### Tenancy   
A `TenantContext` is used to isolate objects that implement `TenantSupport`.      
![sprout-core tenancy erd](/img/erd/core-tenancy.png)  

