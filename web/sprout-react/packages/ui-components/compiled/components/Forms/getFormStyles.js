import { stylesFactory } from '../../themes';
import { getLabelStyles } from './Label';
import { getLegendStyles } from './Legend';
import { getFieldValidationMessageStyles } from './FieldValidationMessage';
import { getButtonStyles } from '../Button';
import { getInputStyles } from '../Input/Input';
import { getSwitchStyles } from '../Switch/Switch';
import { getCheckboxStyles } from './Checkbox';
export var getFormStyles = stylesFactory(function (theme, options) {
    return {
        label: getLabelStyles(theme),
        legend: getLegendStyles(theme),
        fieldValidationMessage: getFieldValidationMessageStyles(theme),
        button: getButtonStyles({
            theme: theme,
            variant: options.variant,
            size: options.size,
            hasIcon: false,
            hasText: true,
        }),
        input: getInputStyles({ theme: theme, invalid: options.invalid }),
        switch: getSwitchStyles(theme),
        checkbox: getCheckboxStyles(theme),
    };
});
//# sourceMappingURL=getFormStyles.js.map