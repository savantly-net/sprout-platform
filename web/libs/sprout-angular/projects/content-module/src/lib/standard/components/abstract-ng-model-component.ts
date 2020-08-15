import { ControlValueAccessor } from '@angular/forms';
import { ChangeDetectorRef, Component, Injector, Input, Type } from '@angular/core';
import { uuid } from '../util/generators';

@Component({ template: '' })
export class AbstractNgModelComponent<T = any> implements ControlValueAccessor {
  @Input()
  cid: string = uuid();

  @Input()
  disabled: boolean;

  @Input()
  set value(value: T) {
    this._value = value;
    this.notifyValueChange();
  }

  get value(): T {
    return this._value;
  }


  protected _value: T;
  protected cdRef: ChangeDetectorRef;

 /**
   * @description
   * The registered callback function called when an input event occurs on the control.
   */
  onChange: (value: T) => {};

  /**
   * @description
   * The registered callback function called when a blur event occurs on the control.
   */
  onTouched: () => {};

  notifyValueChange(): void {
    if (this.onChange) {
      this.onChange(this.value);
    }
  }

  /**
   * Sets the "value" property on the control.
   *
   * @param value The checked value
   */
  writeValue(value: T): void {
    this._value = value;
    setTimeout(() => this.cdRef.detectChanges(), 0);
  }

  /**
   * @description
   * Registers a function called when the control value changes.
   *
   * @param fn The callback function
   */
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  /**
   * @description
   * Registers a function called when the control is touched.
   *
   * @param fn The callback function
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Sets the "disabled" property on the control.
   *
   * @param isDisabled The disabled value
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  constructor(public injector: Injector) {
    this.cdRef = injector.get<ChangeDetectorRef>(ChangeDetectorRef as Type<ChangeDetectorRef>);
  }
}