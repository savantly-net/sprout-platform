import React from 'react';
import { GroupProps } from 'react-select';
import { Themeable } from '../../types';
interface ExtendedGroupProps extends GroupProps<any>, Themeable {
    data: {
        label: string;
        expanded: boolean;
        options: any[];
    };
}
export declare const SelectOptionGroup: React.FunctionComponent<Pick<ExtendedGroupProps, "children" | "data" | "label" | "className" | "cx" | "setValue" | "isMulti" | "options" | "selectProps" | "clearValue" | "getStyles" | "getValue" | "hasValue" | "selectOption" | "Heading">>;
export {};
