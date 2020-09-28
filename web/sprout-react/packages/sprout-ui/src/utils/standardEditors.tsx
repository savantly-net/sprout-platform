import React from 'react';
import {
  FieldConfigPropertyItem,
  NumberFieldConfigSettings,
  standardEditorsRegistry,
  StandardEditorsRegistryItem,
  StringFieldConfigSettings,
  TimeZone,
  FieldColor,
} from '@savantly/sprout-api';

import { Switch } from '../components/Switch/Switch';
import {
  NumberValueEditor,
  RadioButtonGroup,
  StringValueEditor,
  StringArrayEditor,
  SelectValueEditor,
  TimeZonePicker,
} from '../components';
import { ColorValueEditor } from '../components/OptionsUI/color';

/**
 * Returns collection of common field config properties definitions
 */
export const getStandardFieldConfigs = () => {
  const category = ['Standard options'];
  const displayName: FieldConfigPropertyItem<any, string, StringFieldConfigSettings> = {
    id: 'displayName',
    path: 'displayName',
    name: 'Display name',
    description: 'Change the field or series name',
    editor: standardEditorsRegistry.get('text').editor as any,
    settings: {
      placeholder: 'none',
      expandTemplateVars: true,
    },
    category,
  };

  const unit: FieldConfigPropertyItem<any, string, StringFieldConfigSettings> = {
    id: 'unit',
    path: 'unit',
    name: 'Unit',
    description: '',
    editor: standardEditorsRegistry.get('unit').editor as any,
    settings: {
      placeholder: 'none',
    },
    category,
  };

  const min: FieldConfigPropertyItem<any, number, NumberFieldConfigSettings> = {
    id: 'min',
    path: 'min',
    name: 'Min',
    description: 'Leave empty to calculate based on all values',
    editor: standardEditorsRegistry.get('number').editor as any,
    settings: {
      placeholder: 'auto',
    },
    category,
  };

  const max: FieldConfigPropertyItem<any, number, NumberFieldConfigSettings> = {
    id: 'max',
    path: 'max',
    name: 'Max',
    description: 'Leave empty to calculate based on all values',

    editor: standardEditorsRegistry.get('number').editor as any,

    settings: {
      placeholder: 'auto',
    },

    category,
  };

  const decimals: FieldConfigPropertyItem<any, number, NumberFieldConfigSettings> = {
    id: 'decimals',
    path: 'decimals',
    name: 'Decimals',

    editor: standardEditorsRegistry.get('number').editor as any,

    settings: {
      placeholder: 'auto',
      min: 0,
      max: 15,
      integer: true,
    },

    category,
  };

  const noValue: FieldConfigPropertyItem<any, string, StringFieldConfigSettings> = {
    id: 'noValue',
    path: 'noValue',
    name: 'No Value',
    description: 'What to show when there is no value',

    editor: standardEditorsRegistry.get('text').editor as any,
    settings: {
      placeholder: '-',
    },
    category,
  };

  // const color: FieldConfigPropertyItem<any, string, StringFieldConfigSettings> = {
  //   id: 'color',
  //   path: 'color',
  //   name: 'Color',
  //   description: 'Customise color',
  //   editor: standardEditorsRegistry.get('color').editor as any,
  //   override: standardEditorsRegistry.get('color').editor as any,
  //   process: identityOverrideProcessor,
  //   settings: {
  //     placeholder: '-',
  //   },
  //   shouldApply: field => field.type !== FieldType.time,
  //   category,
  // };

  return [unit, min, max, decimals, displayName, noValue];
};

/**
 * Returns collection of standard option editors definitions
 */
export const getStandardOptionEditors = () => {
  const number: StandardEditorsRegistryItem<number> = {
    id: 'number',
    name: 'Number',
    description: 'Allows numeric values input',
    editor: NumberValueEditor as any,
  };

  const text: StandardEditorsRegistryItem<string> = {
    id: 'text',
    name: 'Text',
    description: 'Allows string values input',
    editor: StringValueEditor as any,
  };

  const strings: StandardEditorsRegistryItem<string[]> = {
    id: 'strings',
    name: 'String array',
    description: 'An array of strings',
    editor: StringArrayEditor as any,
  };

  const boolean: StandardEditorsRegistryItem<boolean> = {
    id: 'boolean',
    name: 'Boolean',
    description: 'Allows boolean values input',
    editor: props => <Switch {...props} onChange={e => props.onChange(e.currentTarget.checked)} />,
  };

  const select: StandardEditorsRegistryItem<any> = {
    id: 'select',
    name: 'Select',
    description: 'Allows option selection',
    editor: SelectValueEditor as any,
  };

  const radio: StandardEditorsRegistryItem<any> = {
    id: 'radio',
    name: 'Radio',
    description: 'Allows option selection',
    editor: props => <RadioButtonGroup {...props} options={props.item.settings?.options} />,
  };


  const color: StandardEditorsRegistryItem<FieldColor> = {
    id: 'color',
    name: 'Color',
    description: 'Allows color selection',
    editor: ColorValueEditor as any,
  };

  const timeZone: StandardEditorsRegistryItem<TimeZone> = {
    id: 'timezone',
    name: 'Time Zone',
    description: 'Time zone selection',
    editor: TimeZonePicker as any,
  };

  return [
    text,
    number,
    boolean,
    radio,
    select,
    strings,
    timeZone,
    color,
  ];
};
