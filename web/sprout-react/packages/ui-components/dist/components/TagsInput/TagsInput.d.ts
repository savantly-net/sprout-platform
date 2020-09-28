import React, { ChangeEvent, KeyboardEvent, PureComponent } from 'react';
interface Props {
    tags?: string[];
    width?: number;
    onChange: (tags: string[]) => void;
}
interface State {
    newTag: string;
    tags: string[];
}
export declare class TagsInput extends PureComponent<Props, State> {
    constructor(props: Props);
    onNameChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onRemove: (tagToRemove: string) => void;
    onAdd: (event: React.MouseEvent) => void;
    onKeyboardAdd: (event: KeyboardEvent) => void;
    setNewTags: () => void;
    onChange: () => void;
    render(): JSX.Element;
}
export {};
