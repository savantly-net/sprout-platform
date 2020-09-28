import tinycolor from 'tinycolor2';
export function cardChrome(theme) {
    return "\n       background: " + theme.colors.bg2 + ";\n       &:hover {\n         background: " + hoverColor(theme.colors.bg2, theme) + ";\n       }\n       box-shadow: " + theme.shadows.listItem + ";\n       border-radius: " + theme.border.radius.md + ";\n    ";
}
export function hoverColor(color, theme) {
    return theme.isDark
        ? tinycolor(color)
            .brighten(2)
            .toString()
        : tinycolor(color)
            .darken(2)
            .toString();
}
export function listItem(theme) {
    return "\n  background: " + theme.colors.bg2 + ";\n  &:hover {\n    background: " + hoverColor(theme.colors.bg2, theme) + ";\n  }\n  box-shadow: " + theme.shadows.listItem + ";\n  border-radius: " + theme.border.radius.md + ";\n";
}
export function listItemSelected(theme) {
    return "\n       background: " + hoverColor(theme.colors.bg2, theme) + ";\n       color: " + theme.colors.textStrong + ";\n    ";
}
export var focusCss = function (theme) { return "\n  outline: 2px dotted transparent;\n  outline-offset: 2px;\n  box-shadow: 0 0 0 2px " + theme.colors.bodyBg + ", 0 0 0px 4px " + theme.colors.formFocusOutline + ";\n  transition: all 0.2s cubic-bezier(0.19, 1, 0.22, 1);\n"; };
//# sourceMappingURL=mixins.js.map