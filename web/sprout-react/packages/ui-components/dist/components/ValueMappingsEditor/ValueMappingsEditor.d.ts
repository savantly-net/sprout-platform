import React from 'react';
import { ValueMapping } from '@grafana/data';
export interface Props {
    value: ValueMapping[];
    onChange: (valueMappings: ValueMapping[]) => void;
}
export declare const ValueMappingsEditor: React.FC<Props>;
