import React from 'react';
import { VariableSuggestion, DataLink } from '@savantly/sprout-api';
interface DataLinkEditorProps {
    index: number;
    isLast: boolean;
    value: DataLink;
    suggestions: VariableSuggestion[];
    onChange: (index: number, link: DataLink, callback?: () => void) => void;
}
export declare const DataLinkEditor: React.FC<DataLinkEditorProps>;
export {};
