import { __assign } from "tslib";
import React from 'react';
import { Icon } from '../../../Icon/Icon';
// Ignoring because I couldn't get @types/react-select work with Torkel's fork
// @ts-ignore
import { components } from '@torkelo/react-select';
export var IndicatorsContainer = function (props) {
    var isOpen = props.selectProps.menuIsOpen;
    return (React.createElement(components.IndicatorsContainer, __assign({}, props),
        React.createElement(Icon, { name: isOpen ? 'angle-up' : 'angle-down', style: { marginTop: '7px' } })));
};
export default IndicatorsContainer;
//# sourceMappingURL=IndicatorsContainer.js.map