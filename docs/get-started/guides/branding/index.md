---
title: Branding
description: Learn how to apply branding to your Sprout Site
---

There are multiple ways to introduce your own branding.  

- Override the BrandingApi bean by providing your own implementation.
- Place your images in the expected locations.
- Change the default resource locations for the images.
- Change the default URLs for the images.  

## Resource Locations
If you have a custom server, you can define the resource locations to provide branded images to the UI.  
In this example, the resources are embedded in the server jar.  

```
sprout:
  branding:
    favicon-resource: classpath:/static/images/favicon.png
    logo-resource: classpath:/static/images/logo.png
    mini-logo-resource: classpath:/static/images/favicon-mini.png
```
