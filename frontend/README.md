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

The UI plugin system is forked from the Grafana plugin system, but without Angular or time-series functionality.  
Please refer to Grafana's tutorials for [plugin development](https://grafana.com/tutorials/build-a-panel-plugin) until Sprout plugin tutorials are available.  
_Looking for documentation contributions. Submit PRs if you'd like to help_


```bash
npm install -g @savantly/sprout-toolkit
mkdir myplugin && cd myplugin
sprout-toolkit plugin:create

# answer a few questions, and your plugin is ready.
```

Example output from plugin creation - 
```bash
? Select plugin type Panel Plugin
✔ Fetching plugin template...
? Plugin name MyTestPlugin
? Organization (used as part of plugin ID) savantly
? Description A test panel plugin
? Keywords (separated by comma) savantly, sprout, plugin, panel, example
? Author (Jeremy Branham) Yes
? Your URL (i.e. organisation url) https://savantly.net

    Your plugin details
    ---
    Name:  MyTestPlugin
    ID:  savantly-my-test-plugin
    Description:  A test panel plugin
    Keywords:  [ 'savantly', 'sprout', 'plugin', 'panel', 'example' ]
    Author:  Jeremy Branham
    Organisation:  savantly
    Website:  https://savantly.net

? Is that ok? Yes
✔ Saving package.json and plugin.json files
✔ Cleaning

    Congrats! You have just created Sprout Panel Plugin.

    Sprout Panel Plugin tutorial: https://grafana.com/tutorials/build-a-panel-plugin
    Learn more about Grafana Plugins at https://grafana.com/docs/grafana/latest/plugins/developing/development/
```

Install dependencies -  
`npm install`  
or  
`yarn`  

Build -  
`npm run build`  
or  
`yarn build`  