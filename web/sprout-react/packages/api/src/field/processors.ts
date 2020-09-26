import { SelectableValue } from '../types';

export interface NumberFieldConfigSettings {
  placeholder?: string;
  integer?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

export interface SelectFieldConfigSettings<T> {
  allowCustomValue?: boolean;

  /** The default options */
  options: Array<SelectableValue<T>>;

  /** Optionally use the context to define the options */
  getOptions?: () => Promise<Array<SelectableValue<T>>>;
}

export interface StringFieldConfigSettings {
  placeholder?: string;
  maxLength?: number;
  expandTemplateVars?: boolean;
  useTextarea?: boolean;
  rows?: number;
}

export interface ColorFieldConfigSettings {
  allowUndefined?: boolean;
  textWhenUndefined?: string; // Pick Color
  disableNamedColors?: boolean;
}
