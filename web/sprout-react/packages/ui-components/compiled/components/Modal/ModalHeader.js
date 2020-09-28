import React, { useContext } from 'react';
import { getModalStyles } from './getModalStyles';
import { ThemeContext } from '../../themes';
import { Icon } from '../Icon/Icon';
export var ModalHeader = function (_a) {
    var icon = _a.icon, title = _a.title, children = _a.children;
    var theme = useContext(ThemeContext);
    var styles = getModalStyles(theme);
    return (React.createElement(React.Fragment, null,
        React.createElement("h2", { className: styles.modalHeaderTitle },
            icon && React.createElement(Icon, { name: icon, size: "lg", className: styles.modalHeaderIcon }),
            title),
        children));
};
//# sourceMappingURL=ModalHeader.js.map