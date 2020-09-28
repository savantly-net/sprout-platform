import { __extends } from "tslib";
import React from 'react';
import debounce from 'lodash/debounce';
import { readCSV } from '@grafana/data';
import { Icon } from '../Icon/Icon';
/**
 * Expects the container div to have size set and will fill it 100%
 */
var TableInputCSV = /** @class */ (function (_super) {
    __extends(TableInputCSV, _super);
    function TableInputCSV(props) {
        var _this = _super.call(this, props) || this;
        _this.readCSV = debounce(function () {
            var config = _this.props.config;
            var text = _this.state.text;
            _this.setState({ data: readCSV(text, { config: config }) });
        }, 150);
        _this.onTextChange = function (event) {
            _this.setState({ text: event.target.value });
        };
        var text = props.text, config = props.config;
        _this.state = {
            text: text,
            data: readCSV(text, { config: config }),
        };
        return _this;
    }
    TableInputCSV.prototype.componentDidUpdate = function (prevProps, prevState) {
        var text = this.state.text;
        if (text !== prevState.text || this.props.config !== prevProps.config) {
            this.readCSV();
        }
        // If the props text has changed, replace our local version
        if (this.props.text !== prevProps.text && this.props.text !== text) {
            this.setState({ text: this.props.text });
        }
        if (this.state.data !== prevState.data) {
            this.props.onSeriesParsed(this.state.data, this.state.text);
        }
    };
    TableInputCSV.prototype.render = function () {
        var _a = this.props, width = _a.width, height = _a.height;
        var data = this.state.data;
        return (React.createElement("div", { className: "gf-table-input-csv" },
            React.createElement("textarea", { style: { width: width, height: height }, placeholder: "Enter CSV here...", value: this.state.text, onChange: this.onTextChange, className: "gf-form-input" }),
            data && (React.createElement("footer", null, data.map(function (frame, index) {
                return (React.createElement("span", { key: index },
                    "Rows:",
                    frame.length,
                    ", Columns:",
                    frame.fields.length,
                    " \u00A0",
                    React.createElement(Icon, { name: "check-circle" })));
            })))));
    };
    return TableInputCSV;
}(React.PureComponent));
export { TableInputCSV };
export default TableInputCSV;
//# sourceMappingURL=TableInputCSV.js.map