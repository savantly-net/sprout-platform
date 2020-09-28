import { SelectableValue } from '@grafana/data';
import { SelectOptions } from './types';
/**
 * Normalize the value format to SelectableValue[] | []. Only used for single select
 */
export declare const cleanValue: (value: any, options: SelectOptions) => SelectableValue[] | [];
/**
 * Find the label for a string|number value inside array of options or optgroups
 */
export declare const findSelectedValue: (value: string | number, options: SelectOptions) => SelectableValue | null;
