import { FC } from 'react';
import { DataFrame, DataLink, VariableSuggestion } from '@savantly/sprout-api';
interface DataLinksListItemProps {
    index: number;
    link: DataLink;
    data: DataFrame[];
    onChange: (index: number, link: DataLink) => void;
    onEdit: () => void;
    onRemove: () => void;
    suggestions: VariableSuggestion[];
    isEditing?: boolean;
}
export declare const DataLinksListItem: FC<DataLinksListItemProps>;
export {};
