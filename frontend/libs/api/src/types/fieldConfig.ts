export enum FieldType {
  time = 'time', // or date
  number = 'number',
  string = 'string',
  boolean = 'boolean',
  // Used to detect that the value is some kind of trace data to help with the visualisation and processing.
  trace = 'trace',
  other = 'other', // Object, Array, etc
}

/**
 * Every property is optional
 *
 * Plugins may extend this with additional properties. Something like series overrides
 */
export interface FieldConfig<TOptions extends object = any> {
  /**
   * The display value for this field.  This supports template variables blank is auto
   */
  displayName?: string;

  /**
   * This can be used by data sources that return and explicit naming structure for values and labels
   * When this property is configured, this value is used rather than the default naming strategy.
   */
  displayNameFromDS?: string;

  /**
   * True if data source field supports ad-hoc filters
   */
  filterable?: boolean;

  // Numeric Options
  unit?: string;
  decimals?: number | null; // Significant digits (for display)
  min?: number | null;
  max?: number | null;

  // Alternative to empty string
  noValue?: string;

  // Panel Specific Values
  custom?: TOptions;
}


