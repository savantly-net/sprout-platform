import React, { FC, ReactNode } from 'react';
export declare type AlertVariant = 'success' | 'warning' | 'error' | 'info';
export interface Props {
    title: string;
    /** On click handler for alert button, mostly used for dismissing the alert */
    onRemove?: (event: React.MouseEvent) => void;
    severity?: AlertVariant;
    children?: ReactNode;
    /** Custom component or text for alert button */
    buttonContent?: ReactNode | string;
    /** @deprecated */
    /** Deprecated use onRemove instead */
    onButtonClick?: (event: React.MouseEvent) => void;
    /** @deprecated */
    /** Deprecated use buttonContent instead */
    buttonText?: string;
}
export declare const Alert: FC<Props>;
