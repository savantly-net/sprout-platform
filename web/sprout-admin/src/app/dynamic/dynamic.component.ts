import { Component, Input } from '@angular/core';

@Component({
  template: `<div [innerHTML]="body"></div>`
})
export class DynamicComponent {
  @Input() body: any;
}
