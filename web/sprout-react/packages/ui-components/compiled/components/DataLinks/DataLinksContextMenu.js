import { __makeTemplateObject } from "tslib";
import React from 'react';
import { WithContextMenu } from '../ContextMenu/WithContextMenu';
import { linkModelToContextMenuItems } from '../../utils/dataLinks';
import { css } from 'emotion';
export var DataLinksContextMenu = function (_a) {
    var children = _a.children, links = _a.links;
    var getDataLinksContextMenuItems = function () {
        return [{ items: linkModelToContextMenuItems(links), label: 'Data links' }];
    };
    // Use this class name (exposed via render prop) to add context menu indicator to the click target of the visualization
    var targetClassName = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    cursor: context-menu;\n  "], ["\n    cursor: context-menu;\n  "])));
    return (React.createElement(WithContextMenu, { getContextMenuItems: getDataLinksContextMenuItems }, function (_a) {
        var openMenu = _a.openMenu;
        return children({ openMenu: openMenu, targetClassName: targetClassName });
    }));
};
var templateObject_1;
//# sourceMappingURL=DataLinksContextMenu.js.map