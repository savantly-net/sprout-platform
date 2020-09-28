import React, { FunctionComponent } from 'react';
import { Labels } from '@savantly/sprout-api';
import { Themeable } from '../../types/theme';
interface Props extends Themeable {
    labels: Labels;
}
export declare const UnThemedLogLabels: FunctionComponent<Props>;
export declare const LogLabels: React.FunctionComponent<Pick<Props, "labels">>;
export {};
