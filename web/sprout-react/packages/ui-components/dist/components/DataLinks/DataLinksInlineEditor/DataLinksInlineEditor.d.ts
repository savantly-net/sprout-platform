import { DataFrame, DataLink, VariableSuggestion } from '@savantly/sprout-api';
import React from 'react';
interface DataLinksInlineEditorProps {
    links?: DataLink[];
    onChange: (links: DataLink[]) => void;
    suggestions: VariableSuggestion[];
    data: DataFrame[];
}
export declare const DataLinksInlineEditor: React.FC<DataLinksInlineEditorProps>;
export {};
