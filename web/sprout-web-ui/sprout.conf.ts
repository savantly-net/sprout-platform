import { NgModule } from '@angular/core';
const sproutPlugins = require('./sprout.plugins.json');

function getNgModules(): NgModule[] {
  const result: NgModule[] = [];
  sproutPlugins.plugins.map(function(modulePath){
     console.log(modulePath);
    result.push(new NgModule());
  });
  return result;
}

export const sproutHome: string = sproutPlugins.home;

export const plugins: NgModule[] = getNgModules();

@NgModule()
export class SproutConfigurationModule {
  constructor() {
  }
}
