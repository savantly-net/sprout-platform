import React from 'react';
var CenteredStory = function (_a) {
    var horizontal = _a.horizontal, vertical = _a.vertical, children = _a.children;
    return (React.createElement("div", { style: {
            minHeight: '100%',
            width: '100%',
            display: 'flex',
            alignItems: vertical ? 'center' : 'flex-start',
            justifyContent: horizontal ? 'center' : 'flex-start',
        } }, children));
};
export var withNotCenteredStory = function (story) { return React.createElement(CenteredStory, null, story()); };
export var withCenteredStory = function (story) { return (React.createElement(CenteredStory, { horizontal: true, vertical: true }, story())); };
export var withHorizontallyCenteredStory = function (story) { return (React.createElement(CenteredStory, { horizontal: true }, story())); };
export var withVerticallyCenteredStory = function (story) { return React.createElement(CenteredStory, { vertical: true }, story()); };
//# sourceMappingURL=withCenteredStory.js.map