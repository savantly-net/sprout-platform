---
title: Authentication
description: Learn how to configure authentication for the Sprout UI and Server
---

Sprout supports several authentication mechanisms.  

## Basic  
Basic authentication is provided by default, and an initial admin user is created if you're using the default server.  
You may configure basic auth users to be created at startup using the application properties.  
If the user already exists, the configuration is skipped. This allows you to change a password after provisioning, without it being overwritten.  

Example configuration -  

```
sprout:
  security:
    authentication:
      basic:
        enable: true
        users:
        - username: admin
          password: changeme!
          email-address: example@savantly.net
```

## OAuth2  
You can provide provide the UI with an Implicit OAuth2 flow by configuring the properties.  

Example using keycloak -  
In this example, a realm called `my-realm` and a client called `webapp` have been created in keycloak.  
Implicit flow has also been enabled for the `webapp` client.  

```
sprout:
  security:
    authentication:
      oauth:
        clients:
        - name: keycloak
          display-name: Login with Keycloak Account
          authorization-url: https://my-keycloak:9090/auth/realms/my-realm/protocol/openid-connect/auth
          token-url: https://my-keycloak:9090/auth/realms/my-realm/protocol/openid-connect/token
          user-info-url: https://my-keycloak:9090/auth/realms/my-realm/protocol/openid-connect/userinfo
          jwks-url: https://my-keycloak:9090/auth/realms/my-realm/protocol/openid-connect/certs
          scope: openid profile email
          redirect-url: "http://localhost:8080/"
          clientId: webapp
          flow-type: IMPLICIT
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: https://my-keycloak:9090/auth/realms/my-realm/protocol/openid-connect/certs
```

OAuth can be further configured by providing your own implementations of certain beans.  
Each of these interfaces have default implementations that can be extended, or replaced.  

`OAuth2UserSynchronizer` executes after a successful authentication. It receieves an `OAuth2User` and should produce a `SproutUser`  
`OAuthConfigurer` configures the Spring `HttpSecurity`  
`OAuthUserMapper` maps an `OAuth2User` to a `SproutOAuthUser`  
`OAuth2UserService` receives an `OAuth2UserRequest` and produces an `OAuth2User`.  
`OidcUserService` receives an `OidcUserRequest` and produces an `OAuth2User`.  

## JWT
The backend server application uses standard Spring Authentication properties.  
Example of JWT configuration in the application.properties -  

```
spring:
  security:
    oauth2:
      resourceserver:
        jwt:
          jwk-set-uri: https://my-keycloak:9090/auth/realms/my-realm/protocol/openid-connect/certs
```

## Cookie
TODO: Improve Documentation  
After logging in, a session cookie is established to provide authentication when requesting static resources from a static site, such as the Sprout Web UI.  
