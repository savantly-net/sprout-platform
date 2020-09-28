import React from 'react';
import { DataFrame, RegistryItem, FieldMatcherInfo } from '@savantly/sprout-api';
export interface FieldMatcherUIRegistryItem<TOptions> extends RegistryItem {
    component: React.ComponentType<MatcherUIProps<TOptions>>;
    matcher: FieldMatcherInfo<TOptions>;
    optionsToLabel: (options: TOptions) => string;
}
export interface MatcherUIProps<T> {
    matcher: FieldMatcherInfo<T>;
    data: DataFrame[];
    options: T;
    onChange: (options: T) => void;
}
