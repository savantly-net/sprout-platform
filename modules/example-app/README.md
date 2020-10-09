# Sprout Panel Plugin Template

This template is a starting point for building Sprout Panel Plugins  

Read more about [Sprout](https://github.com/savantly-net/sprout-platform)  


## What is Sprout Panel Plugin?
Panels are added to pages on a Sprout application. They allow you to display data in different ways. While Sprout has built-in panels, you can also build your own panel, to add support for other data or visualizations.

We got inspiration [and lot's of code] from Grafana's plugin framework.  
For more information about Grafana panels, refer to the documentation on [Panels](https://grafana.com/docs/grafana/latest/features/panels/panels/)  

Sprout only supports a subset of Grafana panel features, since Sprout data isn't time-series based.  

## Getting started
1. Install dependencies
```BASH
yarn install
```
2. Build plugin in development mode or run in watch mode
```BASH
yarn dev
```
or
```BASH
yarn watch
```
3. Build plugin in production mode
```BASH
yarn build
```

## Learn more
The Grafana documentation is helpful, until it is replaced by Sprout documentation [TODO].  

- [Build a panel plugin tutorial](https://grafana.com/tutorials/build-a-panel-plugin)
- [Grafana UI Library](https://developers.grafana.com/ui) - UI components to help you build interfaces using Grafana Design System
