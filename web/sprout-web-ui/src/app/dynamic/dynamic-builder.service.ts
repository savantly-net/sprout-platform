import { DynamicComponent } from './dynamic.component';
import { Injectable, ViewContainerRef, ComponentFactoryResolver, ComponentRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable()
export class DynamicBuilderService {

  constructor(private factoryResolver: ComponentFactoryResolver, private _sanitizer: DomSanitizer) { }

  createComponent(template: string, viewContainerRef: ViewContainerRef): ComponentRef<DynamicComponent> {
    const factory = this.factoryResolver.resolveComponentFactory(DynamicComponent);
    const componentRef = factory.create(viewContainerRef.parentInjector);
    // Trust the html so tags aren't stripped. Risky but adds flexibility for plugins
    componentRef.instance.body = this._sanitizer.bypassSecurityTrustHtml(template);
    viewContainerRef.insert(componentRef.hostView);
    return componentRef;
  }
}
