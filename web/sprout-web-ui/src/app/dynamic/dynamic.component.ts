import { Component, Input, AfterViewInit, ViewChild, Directive, ElementRef } from '@angular/core';

@Directive({
  /* tslint:disable-next-line:directive-selector */
  selector: 'dynamic-directive'
})
export class DynamicDirective {}

@Component({
  template: `<dynamic-directive></dynamic-directive>`
})
export class DynamicComponent implements AfterViewInit {
  @Input() body: any;
  @ViewChild(DynamicDirective, {read: ElementRef}) dynamic: ElementRef;
  html: HTMLDivElement = document.createElement('div');

  ngAfterViewInit(): void {
    this.html.innerHTML = this.body;
    for (let i = 0; i < this.html.childNodes.length; i++) {
      const n = this.html.childNodes[i];
      if (n.nodeName === 'SCRIPT') {
        // Create a new script element so HTML5 will execute it upon adding to DOM
        const scriptElement = document.createElement('script');
        // Copy all the attributes from the original script element
        for (let aI = 0; aI < n.attributes.length; aI++) {
          scriptElement.attributes.setNamedItem(<Attr>n.attributes[aI].cloneNode());
        }
        // Add any content the original script element has
        const scriptContent = document.createTextNode(n.textContent);
        scriptElement.appendChild(scriptContent);
        // Finally add the script element to the DOM
        this.dynamic.nativeElement.appendChild(scriptElement);
      } else {
        this.dynamic.nativeElement.appendChild(n);
      }
    }
  }
}
