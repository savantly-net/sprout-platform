import React from 'react';
import { PopoverContentProps } from '../Tooltip/Tooltip';
import { Themeable } from '../../types/theme';
export declare type ColorPickerChangeHandler = (color: string) => void;
export interface ColorPickerProps extends Themeable {
    color: string;
    onChange: ColorPickerChangeHandler;
    /**
     * @deprecated Use onChange instead
     */
    onColorChange?: ColorPickerChangeHandler;
    enableNamedColors?: boolean;
}
export interface Props<T> extends ColorPickerProps, PopoverContentProps {
    customPickers?: T;
}
declare type PickerType = 'palette' | 'spectrum';
export interface CustomPickersDescriptor {
    [key: string]: {
        tabComponent: React.ComponentType<ColorPickerProps>;
        name: string;
    };
}
interface State<T> {
    activePicker: PickerType | keyof T;
}
export declare class ColorPickerPopover<T extends CustomPickersDescriptor> extends React.Component<Props<T>, State<T>> {
    constructor(props: Props<T>);
    getTabClassName: (tabName: PickerType | keyof T) => string;
    handleChange: (color: any) => void;
    onTabChange: (tab: PickerType | keyof T) => () => void;
    renderPicker: () => JSX.Element | null;
    renderCustomPicker: (tabKey: keyof T) => React.ReactElement<ColorPickerProps, string | ((props: any) => React.ReactElement<any, string | any | (new (props: any) => React.Component<any, any, any>)> | null) | (new (props: any) => React.Component<any, any, any>)> | null;
    renderCustomPickerTabs: () => JSX.Element | null;
    render(): JSX.Element;
}
export {};
