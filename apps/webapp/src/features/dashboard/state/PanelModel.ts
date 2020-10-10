// Types
import {
    eventFactory,
    PanelEvents,
    PanelPlugin,
    ScopedVars
} from '@savantly/sprout-api';
import _ from 'lodash';
import config from '../../../core/config';
import { EDIT_PANEL_ID } from '../../../core/constants';
// Utils
import { Emitter } from '../../../core/utils/emitter';



export const panelAdded = eventFactory<PanelModel | undefined>('panel-added');
export const panelRemoved = eventFactory<PanelModel | undefined>('panel-removed');

export interface GridPos {
  x: number;
  y: number;
  w: number;
  h: number;
  static?: boolean;
}

const notPersistedProperties: { [str: string]: boolean } = {
  events: true,
  isViewing: true,
  isEditing: true,
  isInView: true,
  hasRefreshed: true,
  cachedPluginOptions: true,
  plugin: true,
  queryRunner: true,
  replaceVariables: true,
  editSourceId: true,
};

// For angular panels we need to clean up properties when changing type
// To make sure the change happens without strange bugs happening when panels use same
// named property with different type / value expectations
// This is not required for react panels
const mustKeepProps: { [str: string]: boolean } = {
  id: true,
  gridPos: true,
  type: true,
  title: true,
  scopedVars: true,
  repeat: true,
  repeatIteration: true,
  repeatPanelId: true,
  repeatDirection: true,
  repeatedByRow: true,
  minSpan: true,
  collapsed: true,
  panels: true,
  targets: true,
  datasource: true,
  timeFrom: true,
  timeShift: true,
  hideTimeOverride: true,
  description: true,
  links: true,
  fullscreen: true,
  isEditing: true,
  hasRefreshed: true,
  events: true,
  cacheTimeout: true,
  cachedPluginOptions: true,
  transparent: true,
  pluginVersion: true,
  queryRunner: true,
  transformations: true,
  fieldConfig: true,
};

const defaults: any = {
  gridPos: { x: 0, y: 0, h: 3, w: 6 },
  targets: [{ refId: 'A' }],
  cachedPluginOptions: {},
  transparent: false,
  options: {},
};

export class PanelModel {
  /* persisted id, used in URL to identify a panel */
  id!: number;
  editSourceId!: number;
  gridPos!: GridPos;
  type!: string;
  title!: string;
  alert?: any;
  scopedVars?: ScopedVars;
  maxPerRow?: number;
  collapsed?: boolean;
  panels?: any;
  soloMode?: boolean;
  pluginVersion?: string;

  hideTimeOverride?: any;
  options: {
    [key: string]: any;
  } = {};

  description?: string;
  transparent: boolean = false;

  // non persisted
  isViewing: boolean = false;
  isEditing: boolean = false;
  isInView: boolean = false;
  hasRefreshed: boolean = false;
  events: Emitter;
  cacheTimeout?: any;
  cachedPluginOptions?: any;
  plugin?: PanelPlugin;

  constructor(model: any) {
    this.events = new Emitter();
    this.restoreModel(model);
  }

  /** Given a persisted PanelModel restores property values */
  restoreModel(model: any) {
    // copy properties from persisted model
    for (const property in model) {
      (this as any)[property] = model[property];
    }

    // defaults
    _.defaultsDeep(this, _.cloneDeep(defaults));
  }

  getOptions() {
    return this.options;
  }
  updateOptions(options: object) {
    this.options = options;

    this.render();
  }

  getSaveModel() {
    const model: any = {};
    for (const property in this) {
      if (notPersistedProperties[property] || !this.hasOwnProperty(property)) {
        continue;
      }

      if (_.isEqual(this[property], defaults[property])) {
        continue;
      }

      model[property] = _.cloneDeep(this[property]);
    }
    return model;
  }

  setIsViewing(isViewing: boolean) {
    this.isViewing = isViewing;
  }

  updateGridPos(newPos: GridPos) {
    let sizeChanged = false;

    if (this.gridPos.w !== newPos.w || this.gridPos.h !== newPos.h) {
      sizeChanged = true;
    }

    this.gridPos.x = newPos.x;
    this.gridPos.y = newPos.y;
    this.gridPos.w = newPos.w;
    this.gridPos.h = newPos.h;

    if (sizeChanged) {
      this.events.emit(PanelEvents.panelSizeChanged);
    }
  }

  resizeDone() {
    this.events.emit(PanelEvents.panelSizeChanged);
  }

  refresh() {
    this.hasRefreshed = true;
    this.events.emit(PanelEvents.refresh);
  }

  render() {
    if (!this.hasRefreshed) {
      this.refresh();
    } else {
      this.events.emit(PanelEvents.render);
    }
  }

  initialized() {
    this.events.emit(PanelEvents.panelInitialized);
  }

  private getOptionsToRemember() {
    return Object.keys(this).reduce((acc, property) => {
      if (notPersistedProperties[property] || mustKeepProps[property]) {
        return acc;
      }
      return {
        ...acc,
        [property]: (this as any)[property],
      };
    }, {});
  }

  private restorePanelOptions(pluginId: string) {
    const prevOptions = this.cachedPluginOptions[pluginId] || {};

    Object.keys(prevOptions).forEach(property => {
      (this as any)[property] = prevOptions[property];
    });
  }

  private applyPluginOptionDefaults(plugin: PanelPlugin) {
    this.options = _.mergeWith({}, plugin.defaults, this.options || {}, (objValue: any, srcValue: any): any => {
      if (_.isArray(srcValue)) {
        return srcValue;
      }
    });
  }
  

  pluginLoaded(plugin: PanelPlugin) {
    this.plugin = plugin;

    if (plugin.panel && plugin.onPanelMigration) {
      const version = getPluginVersion(plugin);

      if (version !== this.pluginVersion) {
        this.options = plugin.onPanelMigration(this);
        this.pluginVersion = version;
      }
    }

    this.applyPluginOptionDefaults(plugin);
  }

  changePlugin(newPlugin: PanelPlugin) {
    const pluginId = newPlugin.meta.id;
    const oldOptions: any = this.getOptionsToRemember();
    const oldPluginId = this.type;

    // remove panel type specific  options
    for (const key of _.keys(this)) {
      if (mustKeepProps[key]) {
        continue;
      }

      delete (this as any)[key];
    }

    this.cachedPluginOptions[oldPluginId] = oldOptions;
    this.restorePanelOptions(pluginId);

    // Let panel plugins inspect options from previous panel and keep any that it can use
    if (newPlugin.onPanelTypeChanged) {
      let old: any = {};

      if (oldOptions && oldOptions.options) {
        old = oldOptions.options;
      }
      this.options = this.options || {};
      Object.assign(this.options, newPlugin.onPanelTypeChanged(this, oldPluginId, old));
    }

    // switch
    this.type = pluginId;
    this.plugin = newPlugin;

    this.applyPluginOptionDefaults(newPlugin);

    if (newPlugin.onPanelMigration) {
      this.pluginVersion = getPluginVersion(newPlugin);
    }
  }

  getEditClone() {
    const sourceModel = this.getSaveModel();

    // Temporary id for the clone, restored later in redux action when changes are saved
    sourceModel.id = EDIT_PANEL_ID;
    sourceModel.editSourceId = this.id;

    const clone = new PanelModel(sourceModel);
    clone.isEditing = true;
    return clone;
  }

  hasTitle() {
    return this.title && this.title.length > 0;
  }

  destroy() {
    this.events.removeAllListeners();
  }

  /*
   * Panel have a different id while in edit mode (to more easily be able to discard changes)
   * Use this to always get the underlying source id
   * */
  getSavedId(): number {
    return this.editSourceId ?? this.id;
  }
}

function getPluginVersion(plugin: PanelPlugin): string {
  return plugin && plugin.meta.info.version ? plugin.meta.info.version : config.buildInfo.version;
}