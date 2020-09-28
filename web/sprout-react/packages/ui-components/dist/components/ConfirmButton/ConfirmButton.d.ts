import React from 'react';
import { Themeable } from '../../types';
import { ComponentSize } from '../../types/size';
import { ButtonVariant } from '../Button';
export interface Props extends Themeable {
    /** Confirm action callback */
    onConfirm(): void;
    /** Custom button styles */
    className?: string;
    /** Button size */
    size?: ComponentSize;
    /** Text for the Confirm button */
    confirmText?: string;
    /** Disable button click action */
    disabled?: boolean;
    /** Variant of the Confirm button */
    confirmVariant?: ButtonVariant;
    /** Hide confirm actions when after of them is clicked */
    closeOnConfirm?: boolean;
    /** Optional on click handler for the original button */
    onClick?(): void;
    /** Callback for the cancel action */
    onCancel?(): void;
}
export declare const ConfirmButton: React.FunctionComponent<Pick<Props, "size" | "className" | "onClick" | "disabled" | "onConfirm" | "confirmText" | "confirmVariant" | "closeOnConfirm" | "onCancel">>;
