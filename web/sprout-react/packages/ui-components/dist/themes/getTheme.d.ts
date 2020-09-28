import { GrafanaTheme } from '@savantly/sprout-api';
export declare const getTheme: (name?: string | undefined) => GrafanaTheme;
export declare const mockTheme: (mock: (name?: string | undefined) => GrafanaTheme) => () => void;
