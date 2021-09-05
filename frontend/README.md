# Sprout Front-end

The front-end UI of Sprout is a `React` application and can load plugins that extend a React Component.  

| Project | Description |
|- |- |
| [webapp](./apps/webapp/) | The main user interface for Sprout | 
| [@savantly/sprout-api](./libs/api/) | Plugins use types, methods, and services from this library for integration in the Sprout UI |
| [@savantly/sprout-runtime](./libs/runtime/) | [`alpha`] Plugins use this library to interact with a running Sprout server |
| [@savantly/sprout-ui](./libs/sprout-ui/) | Plugins use this component library to create seamless integration in the UI  |
| [@savantly/sprout-toolkit](./tools/sprout-toolkit/) | Use this build tool for easier developing, testing, and packaging of your plugin |
  
  
# Quickstart

### Create a new plugin

TODO

# Micro-frontends POC

A proof of concept using [single-spa](https://single-spa.js.org/)  

Key points - 
- each feature in the app can be developed and tested in isolation
- using 'layouts', we can implement the layout data in json, and generate a layout from the server - which allows us to dynamically add micro-applications/routes at runtime. This also let's us load plugins without requiring them to be packaged in a `jar` for the backend to parse. Some sprout modules may still need jars if they provide server functionality. 
- module mapping allows us to develop locally for a plugin, while pulling the others from remote location, or any combination of those
- using [cross micro frontend imports](https://single-spa.js.org/docs/recommended-setup/#cross-microfrontend-imports) let's us abstract common/shared functionality into modules that can be consumed from any plugin. Could be great for services like "toast notifications" or adding context to the menu. 

Until we have some deployed packages or a way to link locally, for development - each micro-frontend needs to be running locally.  

Open 3 terminals -  

Terminal 1  
```
cd ./apps/sidebar
pnpm install
pnpm start -- --port 8500
```

Terminal 2  
```
cd ./apps/dashboard
pnpm install
pnpm start -- --port 8501
```

Terminal 3  
This is the root config that's responsible for wiring up the imported modules.  
```
cd ./root
pnpm install
pnpm start
```


