import { __assign, __makeTemplateObject, __read } from "tslib";
import React, { useState, useCallback } from 'react';
import { css, cx } from 'emotion';
import { BasicAuthSettings } from './BasicAuthSettings';
import { HttpProxySettings } from './HttpProxySettings';
import { TLSAuthSettings } from './TLSAuthSettings';
import { CustomHeadersSettings } from './CustomHeadersSettings';
import { Select } from '../Forms/Legacy/Select/Select';
import { Input } from '../Forms/Legacy/Input/Input';
import { Switch } from '../Forms/Legacy/Switch/Switch';
import { Icon } from '../Icon/Icon';
import { FormField } from '../FormField/FormField';
import { FormLabel } from '../FormLabel/FormLabel';
import { TagsInput } from '../TagsInput/TagsInput';
import { useTheme } from '../../themes';
var ACCESS_OPTIONS = [
    {
        label: 'Server (default)',
        value: 'proxy',
    },
    {
        label: 'Browser',
        value: 'direct',
    },
];
var DEFAULT_ACCESS_OPTION = {
    label: 'Server (default)',
    value: 'proxy',
};
var HttpAccessHelp = function () { return (React.createElement("div", { className: "grafana-info-box m-t-2" },
    React.createElement("p", null,
        "Access mode controls how requests to the data source will be handled.",
        React.createElement("strong", null,
            React.createElement("i", null, "Server")),
        ' ',
        "should be the preferred way if nothing else stated."),
    React.createElement("div", { className: "alert-title" }, "Server access mode (Default):"),
    React.createElement("p", null, "All requests will be made from the browser to Grafana backend/server which in turn will forward the requests to the data source and by that circumvent possible Cross-Origin Resource Sharing (CORS) requirements. The URL needs to be accessible from the grafana backend/server if you select this access mode."),
    React.createElement("div", { className: "alert-title" }, "Browser access mode:"),
    React.createElement("p", null, "All requests will be made from the browser directly to the data source and may be subject to Cross-Origin Resource Sharing (CORS) requirements. The URL needs to be accessible from the browser if you select this access mode."))); };
export var DataSourceHttpSettings = function (props) {
    var _a;
    var defaultUrl = props.defaultUrl, dataSourceConfig = props.dataSourceConfig, onChange = props.onChange, showAccessOptions = props.showAccessOptions;
    var urlTooltip;
    var _b = __read(useState(false), 2), isAccessHelpVisible = _b[0], setIsAccessHelpVisible = _b[1];
    var theme = useTheme();
    var onSettingsChange = useCallback(function (change) {
        onChange(__assign(__assign({}, dataSourceConfig), change));
    }, [dataSourceConfig]);
    switch (dataSourceConfig.access) {
        case 'direct':
            urlTooltip = (React.createElement(React.Fragment, null,
                "Your access method is ",
                React.createElement("em", null, "Browser"),
                ", this means the URL needs to be accessible from the browser."));
            break;
        case 'proxy':
            urlTooltip = (React.createElement(React.Fragment, null,
                "Your access method is ",
                React.createElement("em", null, "Server"),
                ", this means the URL needs to be accessible from the grafana backend/server."));
            break;
        default:
            urlTooltip = 'Specify a complete HTTP URL (for example http://your_server:8080)';
    }
    var accessSelect = (React.createElement(Select, { width: 20, options: ACCESS_OPTIONS, value: ACCESS_OPTIONS.filter(function (o) { return o.value === dataSourceConfig.access; })[0] || DEFAULT_ACCESS_OPTION, onChange: function (selectedValue) { return onSettingsChange({ access: selectedValue.value }); } }));
    var isValidUrl = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/.test(dataSourceConfig.url);
    var notValidStyle = css(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n    box-shadow: inset 0 0px 5px ", ";\n  "], ["\n    box-shadow: inset 0 0px 5px ", ";\n  "])), theme.palette.red);
    var inputStyle = cx((_a = {}, _a["width-20"] = true, _a[notValidStyle] = !isValidUrl, _a));
    var urlInput = (React.createElement(Input, { className: inputStyle, placeholder: defaultUrl, value: dataSourceConfig.url, onChange: function (event) { return onSettingsChange({ url: event.currentTarget.value }); } }));
    return (React.createElement("div", { className: "gf-form-group" },
        React.createElement(React.Fragment, null,
            React.createElement("h3", { className: "page-heading" }, "HTTP"),
            React.createElement("div", { className: "gf-form-group" },
                React.createElement("div", { className: "gf-form" },
                    React.createElement(FormField, { label: "URL", labelWidth: 11, tooltip: urlTooltip, inputEl: urlInput })),
                showAccessOptions && (React.createElement(React.Fragment, null,
                    React.createElement("div", { className: "gf-form-inline" },
                        React.createElement("div", { className: "gf-form" },
                            React.createElement(FormField, { label: "Access", labelWidth: 11, inputWidth: 20, inputEl: accessSelect })),
                        React.createElement("div", { className: "gf-form" },
                            React.createElement("label", { className: "gf-form-label query-keyword pointer", onClick: function () { return setIsAccessHelpVisible(function (isVisible) { return !isVisible; }); } },
                                "Help\u00A0",
                                React.createElement(Icon, { name: isAccessHelpVisible ? 'angle-down' : 'angle-right', style: { marginBottom: 0 } })))),
                    isAccessHelpVisible && React.createElement(HttpAccessHelp, null))),
                dataSourceConfig.access === 'proxy' && (React.createElement("div", { className: "gf-form" },
                    React.createElement(FormLabel, { width: 11, tooltip: "Grafana Proxy deletes forwarded cookies by default. Specify cookies by name that should be forwarded to the data source." }, "Whitelisted Cookies"),
                    React.createElement(TagsInput, { tags: dataSourceConfig.jsonData.keepCookies, onChange: function (cookies) {
                            return onSettingsChange({ jsonData: __assign(__assign({}, dataSourceConfig.jsonData), { keepCookies: cookies }) });
                        }, width: 20 }))))),
        React.createElement(React.Fragment, null,
            React.createElement("h3", { className: "page-heading" }, "Auth"),
            React.createElement("div", { className: "gf-form-group" },
                React.createElement("div", { className: "gf-form-inline" },
                    React.createElement(Switch, { label: "Basic auth", labelClass: "width-13", checked: dataSourceConfig.basicAuth, onChange: function (event) {
                            onSettingsChange({ basicAuth: event.currentTarget.checked });
                        } }),
                    React.createElement(Switch, { label: "With Credentials", labelClass: "width-13", checked: dataSourceConfig.withCredentials, onChange: function (event) {
                            onSettingsChange({ withCredentials: event.currentTarget.checked });
                        }, tooltip: "Whether credentials such as cookies or auth headers should be sent with cross-site requests." })),
                dataSourceConfig.access === 'proxy' && (React.createElement(HttpProxySettings, { dataSourceConfig: dataSourceConfig, onChange: function (jsonData) { return onSettingsChange({ jsonData: jsonData }); } }))),
            dataSourceConfig.basicAuth && (React.createElement(React.Fragment, null,
                React.createElement("h6", null, "Basic Auth Details"),
                React.createElement("div", { className: "gf-form-group" },
                    React.createElement(BasicAuthSettings, __assign({}, props))))),
            (dataSourceConfig.jsonData.tlsAuth || dataSourceConfig.jsonData.tlsAuthWithCACert) && (React.createElement(TLSAuthSettings, { dataSourceConfig: dataSourceConfig, onChange: onChange })),
            dataSourceConfig.access === 'proxy' && (React.createElement(CustomHeadersSettings, { dataSourceConfig: dataSourceConfig, onChange: onChange })))));
};
var templateObject_1;
//# sourceMappingURL=DataSourceHttpSettings.js.map