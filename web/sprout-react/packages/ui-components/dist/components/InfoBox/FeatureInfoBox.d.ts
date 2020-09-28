import React from 'react';
import { InfoBoxProps } from './InfoBox';
import { FeatureState } from '@grafana/data';
interface FeatureInfoBoxProps extends Omit<InfoBoxProps, 'branded' | 'title' | 'urlTitle'> {
    title: string;
    featureState?: FeatureState;
}
export declare const FeatureInfoBox: React.MemoExoticComponent<React.ForwardRefExoticComponent<FeatureInfoBoxProps & React.RefAttributes<HTMLDivElement>>>;
interface FeatureBadgeProps {
    featureState: FeatureState;
}
export declare const FeatureBadge: React.FC<FeatureBadgeProps>;
export {};
