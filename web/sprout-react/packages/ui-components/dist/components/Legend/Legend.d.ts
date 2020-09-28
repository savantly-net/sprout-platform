/// <reference types="react" />
import { DisplayValue } from '@savantly/sprout-api';
import { LegendList } from './LegendList';
import { LegendTable } from './LegendTable';
export declare const generateLegendItems: (numberOfSeries: number, statsToDisplay?: any[] | undefined) => LegendItem[];
export declare enum LegendDisplayMode {
    List = "list",
    Table = "table"
}
export interface LegendBasicOptions {
    isVisible: boolean;
    asTable: boolean;
}
export interface LegendRenderOptions {
    placement: LegendPlacement;
    hideEmpty?: boolean;
    hideZero?: boolean;
}
export declare type LegendPlacement = 'under' | 'right' | 'over';
export interface LegendOptions extends LegendBasicOptions, LegendRenderOptions {
}
export interface LegendItem {
    label: string;
    color: string;
    isVisible: boolean;
    yAxis: number;
    displayValues?: DisplayValue[];
}
export interface LegendComponentProps {
    className?: string;
    items: LegendItem[];
    placement: LegendPlacement;
    itemRenderer?: (item: LegendItem, index: number) => JSX.Element;
}
export interface LegendProps extends LegendComponentProps {
}
export { LegendList, LegendTable };
