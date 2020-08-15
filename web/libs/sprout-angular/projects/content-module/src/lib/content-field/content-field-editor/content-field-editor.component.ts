import { Component, forwardRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractContentFieldEditorComponent } from './abstract-content-field.component';
import { AbstractNgModelComponent } from '../..';
import { ContentField } from '..';

export const DEFAULT_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ContentFieldEditorComponent),
  multi: true
};

@Component({
  selector: 'sprout-content-field-editor',
  templateUrl: './content-field-editor.component.html',
  styleUrls: ['./content-field-editor.component.scss'],
  providers: [DEFAULT_VALUE_ACCESSOR]
})
export class ContentFieldEditorComponent extends AbstractContentFieldEditorComponent {

  constructor(injector: Injector) {
    super(injector);
    console.log('constructed');
  }

}
