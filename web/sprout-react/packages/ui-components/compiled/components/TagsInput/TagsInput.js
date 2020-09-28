import { __assign, __extends, __makeTemplateObject, __read, __spread } from "tslib";
import React, { PureComponent } from 'react';
import { css, cx } from 'emotion';
import { stylesFactory } from '../../themes/stylesFactory';
import { Button } from '../Button';
import { Input } from '../Forms/Legacy/Input/Input';
import { TagItem } from './TagItem';
var TagsInput = /** @class */ (function (_super) {
    __extends(TagsInput, _super);
    function TagsInput(props) {
        var _this = _super.call(this, props) || this;
        _this.onNameChange = function (event) {
            _this.setState({
                newTag: event.target.value,
            });
        };
        _this.onRemove = function (tagToRemove) {
            _this.setState(function (prevState) { return (__assign(__assign({}, prevState), { tags: prevState.tags.filter(function (tag) { return tagToRemove !== tag; }) })); }, function () { return _this.onChange(); });
        };
        // Using React.MouseEvent to avoid tslint error
        _this.onAdd = function (event) {
            event.preventDefault();
            if (_this.state.newTag !== '') {
                _this.setNewTags();
            }
        };
        _this.onKeyboardAdd = function (event) {
            event.preventDefault();
            if (event.key === 'Enter' && _this.state.newTag !== '') {
                _this.setNewTags();
            }
        };
        _this.setNewTags = function () {
            // We don't want to duplicate tags, clearing the input if
            // the user is trying to add the same tag.
            if (!_this.state.tags.includes(_this.state.newTag)) {
                _this.setState(function (prevState) { return (__assign(__assign({}, prevState), { tags: __spread(prevState.tags, [prevState.newTag]), newTag: '' })); }, function () { return _this.onChange(); });
            }
            else {
                _this.setState({ newTag: '' });
            }
        };
        _this.onChange = function () {
            _this.props.onChange(_this.state.tags);
        };
        _this.state = {
            newTag: '',
            tags: _this.props.tags || [],
        };
        return _this;
    }
    TagsInput.prototype.render = function () {
        var _this = this;
        var _a = this.state, tags = _a.tags, newTag = _a.newTag;
        var getStyles = stylesFactory(function () { return ({
            tagsCloudStyle: css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n        display: flex;\n        justify-content: flex-start;\n        flex-wrap: wrap;\n      "], ["\n        display: flex;\n        justify-content: flex-start;\n        flex-wrap: wrap;\n      "]))),
            addButtonStyle: css(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n        margin-left: 8px;\n      "], ["\n        margin-left: 8px;\n      "]))),
        }); });
        return (React.createElement("div", { className: "width-20" },
            React.createElement("div", { className: cx(['gf-form-inline'], css(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n              margin-bottom: 4px;\n            "], ["\n              margin-bottom: 4px;\n            "])))) },
                React.createElement(Input, { placeholder: "Add Name", onChange: this.onNameChange, value: newTag, onKeyUp: this.onKeyboardAdd }),
                React.createElement(Button, { className: getStyles().addButtonStyle, onClick: this.onAdd, variant: "secondary", size: "md" }, "Add")),
            React.createElement("div", { className: getStyles().tagsCloudStyle }, tags &&
                tags.map(function (tag, index) {
                    return React.createElement(TagItem, { key: tag + "-" + index, name: tag, onRemove: _this.onRemove });
                }))));
    };
    return TagsInput;
}(PureComponent));
export { TagsInput };
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=TagsInput.js.map