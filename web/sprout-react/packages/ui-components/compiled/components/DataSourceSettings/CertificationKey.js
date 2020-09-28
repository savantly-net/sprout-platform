import React from 'react';
export var CertificationKey = function (_a) {
    var hasCert = _a.hasCert, label = _a.label, onChange = _a.onChange, onClick = _a.onClick, placeholder = _a.placeholder;
    return (React.createElement("div", { className: "gf-form-inline" },
        React.createElement("div", { className: "gf-form gf-form--v-stretch" },
            React.createElement("label", { className: "gf-form-label width-7" }, label)),
        !hasCert && (React.createElement("div", { className: "gf-form gf-form--grow" },
            React.createElement("textarea", { rows: 7, className: "gf-form-input gf-form-textarea", onChange: onChange, placeholder: placeholder, required: true }))),
        hasCert && (React.createElement("div", { className: "gf-form" },
            React.createElement("input", { type: "text", className: "gf-form-input max-width-12", disabled: true, value: "configured" }),
            React.createElement("a", { className: "btn btn-secondary gf-form-btn", onClick: onClick }, "reset")))));
};
//# sourceMappingURL=CertificationKey.js.map