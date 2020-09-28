import { PureComponent } from 'react';
import { SelectableValue } from '@savantly/sprout-api';
interface Props {
    onChange: (item?: string) => void;
    value?: string;
    width?: number;
}
export declare class UnitPicker extends PureComponent<Props> {
    onChange: (value: SelectableValue<string>) => void;
    render(): JSX.Element;
}
export {};
