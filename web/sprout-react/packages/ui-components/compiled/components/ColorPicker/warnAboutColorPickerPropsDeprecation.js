import { deprecationWarning } from '@savantly/sprout-api';
export var warnAboutColorPickerPropsDeprecation = function (componentName, props) {
    var onColorChange = props.onColorChange;
    if (onColorChange) {
        deprecationWarning(componentName, 'onColorChange', 'onChange');
    }
};
//# sourceMappingURL=warnAboutColorPickerPropsDeprecation.js.map