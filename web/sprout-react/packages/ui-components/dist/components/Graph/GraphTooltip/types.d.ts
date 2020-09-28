import { ActiveDimensions, TooltipMode } from '../../Chart/Tooltip';
import { Dimension, Dimensions, TimeZone } from '@savantly/sprout-api';
export interface GraphTooltipOptions {
    mode: TooltipMode;
}
export interface GraphDimensions extends Dimensions {
    xAxis: Dimension<number>;
    yAxis: Dimension<number>;
}
export interface GraphTooltipContentProps {
    dimensions: GraphDimensions;
    activeDimensions: ActiveDimensions<GraphDimensions>;
    timeZone?: TimeZone;
}
