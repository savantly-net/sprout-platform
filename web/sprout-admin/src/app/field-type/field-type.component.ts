import { Component, OnInit, Input, forwardRef, Renderer2, ElementRef } from '@angular/core';
import { FormGroup, DefaultValueAccessor, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-field-type',
  templateUrl: './field-type.component.html',
  styleUrls: ['./field-type.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldTypeComponent),
      multi: true
    }
  ]
})
export class FieldTypeComponent implements OnInit, ControlValueAccessor {
  _onTouched: any;
  _onChange: any;
  value: any;
  _fieldControl: any;
  markdownMode = 'editor';

  get fieldControl() {
    return this._fieldControl;
  }

  @Input()
  set fieldControl(val) {
    this._fieldControl = val;
    // this._onChange(this._fieldControl);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }


  constructor(element: ElementRef, _renderer: Renderer2) { }

  ngOnInit() {
  }

}
