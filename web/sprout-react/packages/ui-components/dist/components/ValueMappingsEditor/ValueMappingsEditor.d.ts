import React from 'react';
import { ValueMapping } from '@savantly/sprout-api';
export interface Props {
    value: ValueMapping[];
    onChange: (valueMappings: ValueMapping[]) => void;
}
export declare const ValueMappingsEditor: React.FC<Props>;
