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

  constructor() { }

  // loads all the html from the plugin, but removes the script tags and appends them individually,
  // since html will not execute them if they are part of the innerHTML
  ngAfterViewInit(): void {
    const div = document.createElement('div');
    div.innerHTML = this.body;
    const scriptElements = [];
    const scriptNodes = div.querySelectorAll('script');
    for (let i = 0; i < scriptNodes.length; i++) {
      const scriptNode = scriptNodes[i];
      // Create a new script element so HTML5 will execute it upon adding to DOM
      const scriptElement = document.createElement('script');
      // Copy all the attributes from the original script element
      for (let aI = 0; aI < scriptNode.attributes.length; aI++) {
        scriptElement.attributes.setNamedItem(<Attr>scriptNode.attributes[aI].cloneNode());
      }
      // Add any content the original script element has
      const scriptContent = document.createTextNode(scriptNode.textContent);
      scriptElement.appendChild(scriptContent);
      // Remove the original script element
      scriptNode.remove();
      // add the new element to the list
      scriptElements.push(scriptElement);
    }
    this.dynamic.nativeElement.appendChild(div);
    // Finally add the new script elements to the DOM
    for (let i = 0; i < scriptElements.length; i++) {
      this.dynamic.nativeElement.appendChild(scriptElements[i]);
    }
  }
}
