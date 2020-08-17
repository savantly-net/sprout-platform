import { Component, forwardRef, Injector, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
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
export class ContentFieldEditorComponent extends AbstractContentFieldEditorComponent implements OnInit {

  constructor(injector: Injector) {
    super(injector);
    console.log('constructed');
  }

  ngOnInit(){
    console.log('initialized');
  }

}
