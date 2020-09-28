import React from 'react';
import { ColorPickerProps } from './ColorPickerPopover';
/**
 * If you need custom trigger for the color picker you can do that with a render prop pattern and supply a function
 * as a child. You will get show/hide function which you can map to desired interaction (like onClick or onMouseLeave)
 * and a ref which needs to be passed to an HTMLElement for correct positioning. If you want to use class or functional
 * component as a custom trigger you will need to forward the reference to first HTMLElement child.
 */
declare type ColorPickerTriggerRenderer = (props: {
    ref: React.RefObject<any>;
    showColorPicker: () => void;
    hideColorPicker: () => void;
}) => React.ReactNode;
export declare const colorPickerFactory: <T extends ColorPickerProps>(popover: React.ComponentType<T>, displayName?: string) => {
    new (props: Readonly<T & {
        children?: ColorPickerTriggerRenderer | undefined;
    }>): {
        pickerTriggerRef: React.RefObject<any>;
        onColorChange: (color: string) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextState: Readonly<any>, nextContext: any): void;
    };
    new (props: T & {
        children?: ColorPickerTriggerRenderer | undefined;
    }, context?: any): {
        pickerTriggerRef: React.RefObject<any>;
        onColorChange: (color: string) => void;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
        componentDidMount?(): void;
        shouldComponentUpdate?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextState: Readonly<any>, nextContext: any): boolean;
        componentWillUnmount?(): void;
        componentDidCatch?(error: Error, errorInfo: React.ErrorInfo): void;
        getSnapshotBeforeUpdate?(prevProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, prevState: Readonly<any>): any;
        componentDidUpdate?(prevProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, prevState: Readonly<any>, snapshot?: any): void;
        componentWillMount?(): void;
        UNSAFE_componentWillMount?(): void;
        componentWillReceiveProps?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextContext: any): void;
        UNSAFE_componentWillReceiveProps?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextContext: any): void;
        componentWillUpdate?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextState: Readonly<any>, nextContext: any): void;
        UNSAFE_componentWillUpdate?(nextProps: Readonly<T & {
            children?: ColorPickerTriggerRenderer | undefined;
        }>, nextState: Readonly<any>, nextContext: any): void;
    };
    displayName: string;
    contextType?: React.Context<any> | undefined;
};
export declare const ColorPicker: React.FunctionComponent<Pick<import("./ColorPickerPopover").Props<import("./ColorPickerPopover").CustomPickersDescriptor> & {
    children?: ColorPickerTriggerRenderer | undefined;
}, "children" | "color" | "onChange" | "onColorChange" | "enableNamedColors" | "customPickers" | "updatePopperPosition">>;
export declare const SeriesColorPicker: React.FunctionComponent<Pick<import("./SeriesColorPickerPopover").SeriesColorPickerPopoverProps & {
    children?: ColorPickerTriggerRenderer | undefined;
}, "children" | "color" | "onChange" | "onColorChange" | "enableNamedColors" | "updatePopperPosition" | "yaxis" | "onToggleAxis">>;
export {};
