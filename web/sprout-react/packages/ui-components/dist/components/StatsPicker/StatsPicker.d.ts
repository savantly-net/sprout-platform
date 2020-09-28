import { PureComponent } from 'react';
import { SelectableValue } from '@grafana/data';
interface Props {
    placeholder?: string;
    onChange: (stats: string[]) => void;
    stats: string[];
    allowMultiple?: boolean;
    defaultStat?: string;
    className?: string;
    menuPlacement?: 'auto' | 'bottom' | 'top';
}
export declare class StatsPicker extends PureComponent<Props> {
    static defaultProps: Partial<Props>;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    checkInput: () => void;
    onSelectionChange: (item: SelectableValue<string>) => void;
    render(): JSX.Element;
}
export {};
