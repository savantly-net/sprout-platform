import { DynamicComponent } from './dynamic.component';
import { LoaderComponent } from './loader/loader.component';
import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';

@Injectable()
export class DynamicBuilderService {

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  createComponent(template: string, viewContainerRef: ViewContainerRef): ComponentRef<DynamicComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicComponent);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    componentRef.instance.body = template;
    viewContainerRef.insert(componentRef.hostView);
    return componentRef;
  }

  createLoaderComponent(viewContainerRef: ViewContainerRef): ComponentRef<LoaderComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(LoaderComponent);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    viewContainerRef.insert(componentRef.hostView);
    return componentRef;
  }
}
