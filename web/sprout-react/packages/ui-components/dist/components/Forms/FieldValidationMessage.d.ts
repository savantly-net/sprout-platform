import React from 'react';
import { GrafanaTheme } from '@savantly/sprout-api';
export interface FieldValidationMessageProps {
    children: string;
    /** Override component style */
    className?: string;
}
export declare const getFieldValidationMessageStyles: (theme: GrafanaTheme) => {
    fieldValidationMessage: string;
    fieldValidationMessageIcon: string;
};
export declare const FieldValidationMessage: React.FC<FieldValidationMessageProps>;
