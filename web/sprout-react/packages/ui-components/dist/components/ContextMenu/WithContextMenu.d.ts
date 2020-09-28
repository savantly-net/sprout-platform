import React from 'react';
import { ContextMenuGroup } from './ContextMenu';
interface WithContextMenuProps {
    children: (props: {
        openMenu: React.MouseEventHandler<HTMLElement>;
    }) => JSX.Element;
    getContextMenuItems: () => ContextMenuGroup[];
}
export declare const WithContextMenu: React.FC<WithContextMenuProps>;
export {};
