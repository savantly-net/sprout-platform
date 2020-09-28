import { DataFrame, DataLink, VariableSuggestion } from '@grafana/data';
import React from 'react';
interface DataLinksInlineEditorProps {
    links?: DataLink[];
    onChange: (links: DataLink[]) => void;
    suggestions: VariableSuggestion[];
    data: DataFrame[];
}
export declare const DataLinksInlineEditor: React.FC<DataLinksInlineEditorProps>;
export {};
