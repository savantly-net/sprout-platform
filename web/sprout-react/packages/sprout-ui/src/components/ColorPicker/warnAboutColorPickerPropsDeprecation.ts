import { deprecationWarning } from '@savantly/sprout-api';
import { ColorPickerProps } from './ColorPickerPopover';

export const warnAboutColorPickerPropsDeprecation = (componentName: string, props: ColorPickerProps) => {
  const { onColorChange } = props;
  if (onColorChange) {
    deprecationWarning(componentName, 'onColorChange', 'onChange');
  }
};
