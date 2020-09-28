import React from 'react';
import { VariableSuggestion } from '@savantly/sprout-api';
interface DataLinkInputProps {
    value: string;
    onChange: (url: string, callback?: () => void) => void;
    suggestions: VariableSuggestion[];
    placeholder?: string;
}
export declare const enableDatalinksPrismSyntax: () => void;
export declare const DataLinkInput: React.FC<DataLinkInputProps>;
export {};
