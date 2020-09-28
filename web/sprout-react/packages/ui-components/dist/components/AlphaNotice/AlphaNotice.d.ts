import { FC } from 'react';
import { PluginState } from '@savantly/sprout-api';
export interface Props {
    state?: PluginState;
    text?: string;
    className?: string;
}
export declare const AlphaNotice: FC<Props>;
