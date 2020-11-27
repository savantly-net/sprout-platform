---
title: Authorization
description: Learn how to configure authorization for the Sprout UI and Server 
---

In addition to the `pre/post` authorization annotations that Spring provides, you may also configure authorizations using Spring's expression language.  
The configuration uses `ant` style path matching and http method matching.  

This example restritcs GET access to everything under `/reports` to users that have an authority of `GENERAL_ADMIN` or `GENERAL_READ`.  
It also has a catch all expression that restricts access to everything under `/api` to users that have the role `EVERYONE`.  

```
sprout:
  security:
    authorization:
      patterns:
        - path: /reports/**
          expression:
            GET: hasAnyAuthority('GENERAL_ADMIN', 'GENERAL_READ')
        - path: /api/**
          expression:
            GET: hasRole('EVERYONE')
            PUT: hasRole('EVERYONE')
            POST: hasRole('EVERYONE')
            PATCH: hasRole('EVERYONE')
            DELETE: hasRole('EVERYONE')
            TRACE: hasRole('EVERYONE')
```

More sophisticated expressions can be created.  
See the [Spring Documentation](https://docs.spring.io/spring-security/site/docs/3.0.x/reference/el-access.html) for more information.  
Or other tutorials for Spring Expression Language -  
https://www.baeldung.com/spring-expression-language  


