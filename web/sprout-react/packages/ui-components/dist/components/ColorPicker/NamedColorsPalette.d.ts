/// <reference types="react" />
import { Color } from '@savantly/sprout-api';
import { Themeable } from '../../types/index';
export interface NamedColorsPaletteProps extends Themeable {
    color?: Color;
    onChange: (colorName: string) => void;
}
export declare const NamedColorsPalette: ({ color, onChange, theme }: NamedColorsPaletteProps) => JSX.Element;
