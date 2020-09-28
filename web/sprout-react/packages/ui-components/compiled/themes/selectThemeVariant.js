import { GrafanaThemeType } from '@savantly/sprout-api';
export var selectThemeVariant = function (variants, currentTheme) {
    return variants[currentTheme || GrafanaThemeType.Dark];
};
//# sourceMappingURL=selectThemeVariant.js.map