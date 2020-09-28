import { FieldConfigPropertyItem, NumberFieldConfigSettings, StandardEditorsRegistryItem, StringFieldConfigSettings } from '@savantly/sprout-api';
/**
 * Returns collection of common field config properties definitions
 */
export declare const getStandardFieldConfigs: () => (FieldConfigPropertyItem<any, string, StringFieldConfigSettings> | FieldConfigPropertyItem<any, number, NumberFieldConfigSettings> | FieldConfigPropertyItem<any, any, any> | FieldConfigPropertyItem<any, any[], any>)[];
/**
 * Returns collection of standard option editors definitions
 */
export declare const getStandardOptionEditors: () => (StandardEditorsRegistryItem<any, any> | StandardEditorsRegistryItem<string, any> | StandardEditorsRegistryItem<number, any> | StandardEditorsRegistryItem<boolean, any> | StandardEditorsRegistryItem<any[], any> | StandardEditorsRegistryItem<string[], any>)[];
