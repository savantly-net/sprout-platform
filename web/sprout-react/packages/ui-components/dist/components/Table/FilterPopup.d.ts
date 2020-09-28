import { FC } from 'react';
import { Field } from '@savantly/sprout-api';
import { TableStyles } from './styles';
interface Props {
    column: any;
    tableStyles: TableStyles;
    onClose: () => void;
    field?: Field;
}
export declare const FilterPopup: FC<Props>;
export {};
