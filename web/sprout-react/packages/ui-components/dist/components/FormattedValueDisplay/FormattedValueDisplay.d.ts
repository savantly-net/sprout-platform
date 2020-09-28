import { FC, CSSProperties, HTMLProps } from 'react';
import { FormattedValue } from '@savantly/sprout-api';
export interface Props extends Omit<HTMLProps<HTMLDivElement>, 'className' | 'value' | 'style'> {
    className?: string;
    value: FormattedValue;
    style: CSSProperties;
}
export declare const FormattedValueDisplay: FC<Props>;
