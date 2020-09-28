import { Threshold, ValueMapping, VizOrientation, PanelModel, ReduceDataOptions } from '@savantly/sprout-api';
export interface SingleStatBaseOptions {
    reduceOptions: ReduceDataOptions;
    orientation: VizOrientation;
}
export declare function sharedSingleStatPanelChangedHandler(panel: PanelModel<Partial<SingleStatBaseOptions>> | any, prevPluginId: string, prevOptions: any): any;
export declare function sharedSingleStatMigrationHandler(panel: PanelModel<SingleStatBaseOptions>): SingleStatBaseOptions;
export declare function moveThresholdsAndMappingsToField(old: any): any;
export declare function migrateFromValueOptions(old: any): any;
export declare function migrateOldThresholds(thresholds?: any[]): Threshold[] | undefined;
/**
 * Convert the angular single stat mapping to new react style
 */
export declare function convertOldAngularValueMapping(panel: any): ValueMapping[];
