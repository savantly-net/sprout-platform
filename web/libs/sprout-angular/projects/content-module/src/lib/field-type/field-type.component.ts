import { Component, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'sprout-field-type',
  templateUrl: './field-type.component.html',
  styleUrls: ['./field-type.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class FieldTypeComponent {
  _onTouched: any;
  _onChange: any;
  value: any;
  _fieldControl: FormControl;
  markdownMode = 'editor';

  @Input()
  set fieldControl(val) {
    this._fieldControl = val;
  }
  get fieldControl() {
    return this._fieldControl;
  }
  fieldControlChange: EventEmitter<FormControl> = new EventEmitter<FormControl>();

  get choices() {
    if (this.fieldControl.value?.metaData?.choices) {
      return this.fieldControl.value.metaData.choices.split('\n');
    } else return [];
  }

  onChange(event) {
    this.fieldControlChange.emit(this._fieldControl.value);
    this._fieldControl.patchValue(this._fieldControl.value); // force the control to emit a change
  }

  constructor() { }
}
