import { GrafanaThemeType } from '@savantly/sprout-api';

type VariantDescriptor = { [key in GrafanaThemeType]: string | number };

export const selectThemeVariant = (variants: VariantDescriptor, currentTheme?: GrafanaThemeType) => {
  return variants[currentTheme || GrafanaThemeType.Dark];
};
