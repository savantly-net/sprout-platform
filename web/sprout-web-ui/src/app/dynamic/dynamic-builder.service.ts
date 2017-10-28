import { DynamicComponent } from './dynamic.component';
import { Injectable } from '@angular/core';

@Injectable()
export class DynamicBuilderService {

  createComponent(template: string): any {
    const component = new DynamicComponent();
    component.body = template;
    return component;
  }
}
