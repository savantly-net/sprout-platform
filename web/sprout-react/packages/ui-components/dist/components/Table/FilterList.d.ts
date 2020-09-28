import { FC } from 'react';
import { SelectableValue } from '@savantly/sprout-api';
interface Props {
    values: SelectableValue[];
    options: SelectableValue[];
    onChange: (options: SelectableValue[]) => void;
}
export declare const FilterList: FC<Props>;
export {};
