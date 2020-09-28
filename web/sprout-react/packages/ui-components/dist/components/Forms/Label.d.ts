import React from 'react';
import { GrafanaTheme } from '@savantly/sprout-api';
export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode;
    description?: React.ReactNode;
    category?: string[];
}
export declare const getLabelStyles: (theme: GrafanaTheme) => {
    label: string;
    labelContent: string;
    description: string;
    categories: string;
    chevron: string;
};
export declare const Label: React.FC<LabelProps>;
