import React from 'react';
import { ThemeContext } from '../../themes/ThemeContext';
import { CompletionItem, CompletionItemGroup } from '../../types/completion';
interface Props {
    origin: string;
    groupedItems: CompletionItemGroup[];
    prefix?: string;
    menuRef?: (el: Typeahead) => void;
    onSelectSuggestion?: (suggestion: CompletionItem) => void;
    isOpen?: boolean;
}
export interface State {
    allItems: CompletionItem[];
    listWidth: number;
    listHeight: number;
    itemHeight: number;
    hoveredItem: number | null;
    typeaheadIndex: number | null;
}
export declare class Typeahead extends React.PureComponent<Props, State> {
    static contextType: React.Context<import("@savantly/sprout-api").GrafanaTheme>;
    context: React.ContextType<typeof ThemeContext>;
    listRef: React.RefObject<any>;
    state: State;
    componentDidMount: () => void;
    componentWillUnmount: () => void;
    handleSelectionChange: () => void;
    componentDidUpdate: (prevProps: Readonly<Props>, prevState: Readonly<State>) => void;
    onMouseEnter: (index: number) => void;
    onMouseLeave: () => void;
    moveMenuIndex: (moveAmount: number) => void;
    insertSuggestion: () => void;
    get menuPosition(): string;
    render(): JSX.Element;
}
export {};
