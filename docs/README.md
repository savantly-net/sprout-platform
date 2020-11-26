# Sprout Platform Documentation

## Branding

There are multiple ways to introduce your own branding.  

- Override the BrandingApi bean by providing your own implementation.
- Place your images in the expected locations.
- Change the default resource locations for the images.
- Change the default URLs for the images.  

### Resource Locations
If you have a custom server, you can define the resource locations to provide branded images to the UI.  
In this example, the resources are embedded in the server jar.  

```
sprout:
  branding:
    favicon-resource: classpath:/static/images/favicon.png
    logo-resource: classpath:/static/images/logo.png
    mini-logo-resource: classpath:/static/images/favicon-mini.png
```

## Menus

You can add menus through the API, or through configuration/environment parameters.

### Configuration
`name` is a unique identifier for the menu.  
`display-text` is the text displayed in the UI.  
`icon` is a valid class or font-awesome icon reference.  
`url` is the location the browser should navigate to.  
`children` is a nested collection of menus.  

Example configuration that provides menus for the UI.  

```
sprout:
  menus:
  - name: operations
    display-text: Operations
    icon: cube
    children:
    - name: reports
      display-text: Reports
      url: https://my-external-site/
    - name: internalLink
      display-text: My internal link
      url: ./path/to/somewhere
```

## Authentication 

There are several supported authentication mechanisms.  

### Basic  
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

### OAuth2  
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


## Authorization

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

More sohpisticated expressions can be created.  
See the [Spring Documentation](https://docs.spring.io/spring-security/site/docs/3.0.x/reference/el-access.html) for more information.  
Or other tutorials for Spring Expression Language -  
https://www.baeldung.com/spring-expression-language  


