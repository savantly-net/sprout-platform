import React, { ReactElement } from 'react';
interface LabelProps {
    Component: ReactElement;
    onClick?: () => void;
}
export declare const useExpandableLabel: (initialExpanded: boolean) => [React.ComponentType<LabelProps>, number, boolean, (expanded: boolean) => void];
export {};
