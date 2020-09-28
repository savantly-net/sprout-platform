import React from 'react';
import { IconName, IconType, IconSize } from '../../types/icon';
export interface IconProps extends React.HTMLAttributes<HTMLDivElement> {
    name: IconName;
    size?: IconSize;
    type?: IconType;
}
export declare const Icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<HTMLDivElement>>;
export declare const getSvgSize: (size: IconSize) => 24 | 48 | 12 | 14 | 16 | 18 | 36;
