import { __extends } from "tslib";
import React, { PureComponent } from 'react';
import { withTheme } from '../../themes/index';
import { getAllFields } from './logParser';
var UnThemedLogRowMessageParsed = /** @class */ (function (_super) {
    __extends(UnThemedLogRowMessageParsed, _super);
    function UnThemedLogRowMessageParsed() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    UnThemedLogRowMessageParsed.prototype.render = function () {
        var _a = this.props, row = _a.row, showParsedFields = _a.showParsedFields, getFieldLinks = _a.getFieldLinks;
        var fields = getAllFields(row, getFieldLinks);
        var line = showParsedFields
            .map(function (parsedKey) {
            var field = fields.find(function (field) {
                var key = field.key;
                return key === parsedKey;
            });
            if (field) {
                return parsedKey + "=" + field.value;
            }
            return null;
        })
            .filter(function (s) { return s !== null; })
            .join(' ');
        return React.createElement("td", null, line);
    };
    return UnThemedLogRowMessageParsed;
}(PureComponent));
export var LogRowMessageParsed = withTheme(UnThemedLogRowMessageParsed);
LogRowMessageParsed.displayName = 'LogRowMessageParsed';
//# sourceMappingURL=LogRowMessageParsed.js.map