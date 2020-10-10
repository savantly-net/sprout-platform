import { PluginMeta } from '@savantly/sprout-api';

type SeriesSize = 'sm' | 'md' | 'lg';

export interface SimpleOptions {
  text: string;
  showMessage: boolean;
  messageSize: SeriesSize;
}

export interface ExampleAppSettings {
  customText?: string;
  customCheckbox?: boolean;
}