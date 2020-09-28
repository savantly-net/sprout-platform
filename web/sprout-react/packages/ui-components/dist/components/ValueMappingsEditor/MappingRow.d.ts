import React from 'react';
import { ValueMapping } from '@grafana/data';
export interface Props {
    valueMapping: ValueMapping;
    onUpdate: (value: ValueMapping) => void;
    onRemove: () => void;
}
export declare const MappingRow: React.FC<Props>;
