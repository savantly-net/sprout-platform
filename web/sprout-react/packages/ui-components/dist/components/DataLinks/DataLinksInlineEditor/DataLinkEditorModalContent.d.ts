import { DataFrame, DataLink, VariableSuggestion } from '@savantly/sprout-api';
import { FC } from 'react';
interface DataLinkEditorModalContentProps {
    link: DataLink;
    index: number;
    data: DataFrame[];
    suggestions: VariableSuggestion[];
    onSave: (index: number, ink: DataLink) => void;
    onCancel: (index: number) => void;
}
export declare const DataLinkEditorModalContent: FC<DataLinkEditorModalContentProps>;
export {};
