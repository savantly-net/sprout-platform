import { FC } from 'react';
import { Cell } from 'react-table';
import { Field } from '@savantly/sprout-api';
import { TableFilterActionCallback } from './types';
import { TableStyles } from './styles';
export interface Props {
    cell: Cell;
    field: Field;
    tableStyles: TableStyles;
    onCellFilterAdded?: TableFilterActionCallback;
}
export declare const TableCell: FC<Props>;
