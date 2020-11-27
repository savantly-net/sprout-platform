---
title: Menus
description: Customize the menu structure in the Sprout web app
---

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
