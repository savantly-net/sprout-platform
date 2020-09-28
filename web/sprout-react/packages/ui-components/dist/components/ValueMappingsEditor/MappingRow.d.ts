import React from 'react';
import { ValueMapping } from '@savantly/sprout-api';
export interface Props {
    valueMapping: ValueMapping;
    onUpdate: (value: ValueMapping) => void;
    onRemove: () => void;
}
export declare const MappingRow: React.FC<Props>;
