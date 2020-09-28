import React, { forwardRef } from 'react';
export var ColorPickerTrigger = forwardRef(function ColorPickerTrigger(props, ref) {
    return (React.createElement("div", { ref: ref, onClick: props.onClick, onMouseLeave: props.onMouseLeave, style: {
            overflow: 'hidden',
            background: 'inherit',
            border: 'none',
            color: 'inherit',
            padding: 0,
            borderRadius: 10,
            cursor: 'pointer',
        } },
        React.createElement("div", { style: {
                position: 'relative',
                width: 15,
                height: 15,
                border: 'none',
                margin: 0,
                float: 'left',
                zIndex: 0,
                backgroundImage: 
                // eslint-disable-next-line max-len
                'url(data:image/png,base64,iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAIAAADZF8uwAAAAGUlEQVQYV2M4gwH+YwCGIasIUwhT25BVBADtzYNYrHvv4gAAAABJRU5ErkJggg==)',
            } },
            React.createElement("div", { style: {
                    backgroundColor: props.color,
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                } }))));
});
//# sourceMappingURL=ColorPickerTrigger.js.map