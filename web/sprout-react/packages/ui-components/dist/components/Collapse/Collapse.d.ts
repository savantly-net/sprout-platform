import { FunctionComponent } from 'react';
export interface Props {
    /** Expand or collapse te content */
    isOpen?: boolean;
    /** Text for the Collapse header */
    label: string;
    /** Indicates loading state of the content */
    loading?: boolean;
    /** Toggle collapsed header icon */
    collapsible?: boolean;
    /** Callback for the toggle functionality */
    onToggle?: (isOpen: boolean) => void;
}
export declare const ControlledCollapse: FunctionComponent<Props>;
export declare const Collapse: FunctionComponent<Props>;
