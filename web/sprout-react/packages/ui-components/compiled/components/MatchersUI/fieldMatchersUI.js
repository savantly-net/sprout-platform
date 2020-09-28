import { Registry } from '@savantly/sprout-api';
import { fieldNameMatcherItem } from './FieldNameMatcherEditor';
import { fieldNameByRegexMatcherItem } from './FieldNameByRegexMatcherEditor';
import { fieldTypeMatcherItem } from './FieldTypeMatcherEditor';
export var fieldMatchersUI = new Registry(function () {
    return [fieldNameMatcherItem, fieldNameByRegexMatcherItem, fieldTypeMatcherItem];
});
//# sourceMappingURL=fieldMatchersUI.js.map