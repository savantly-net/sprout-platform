// Libaries
import _ from 'lodash';
// Constants
import { DEFAULT_ANNOTATION_COLOR } from '@grafana/ui';
import { GRID_CELL_HEIGHT, GRID_CELL_VMARGIN, GRID_COLUMN_COUNT, REPEAT_DIR_VERTICAL } from '../../../core/constants';
// Utils & Services
import { Emitter } from '../../../core/utils/emitter';
import { contextSrv } from '../../../core/services/context_srv';
import sortByKeys from '../../../core/utils/sort_by_keys';
// Types
import { GridPos, panelAdded, PanelModel, panelRemoved } from './PanelModel';
import {
  AppEvent,
  PanelEvents,
  UrlQueryValue,
} from '@savantly/sprout-api';
import { CoreEvents, DashboardMeta, KIOSK_MODE_TV } from '../../../types';
import { getConfig } from '../../../core/config';
import { dispatch } from '../../../store/store';

export interface CloneOptions {
  saveVariables?: boolean;
  saveTimerange?: boolean;
  message?: string;
}

export class DashboardModel {
  id: any;
  uid: string;
  title: string;
  autoUpdate: any;
  description: any;
  tags: any;
  style: any;
  timezone: any;
  editable: any;
  graphTooltip: any;
  time: any;
  private originalTime: any;
  timepicker: any;
  templating: { list: any[] };
  private originalTemplating: any;
  annotations: { list: any[] };
  refresh: any;
  snapshot: any;
  schemaVersion: number;
  version: number;
  revision: number;
  links: any;
  gnetId: any;
  panels: PanelModel[];
  panelInEdit?: PanelModel;
  panelInView?: PanelModel;

  // ------------------
  // not persisted
  // ------------------

  meta!: DashboardMeta;
  events: Emitter;

  static nonPersistedProperties: { [str: string]: boolean } = {
    events: true,
    meta: true,
    panels: true, // needs special handling
    templating: true, // needs special handling
    originalTime: true,
    originalTemplating: true,
    panelInEdit: true,
    panelInView: true,
    getVariablesFromState: true,
  };

  constructor(data: any, meta?: DashboardMeta) {
    if (!data) {
      data = {};
    }

    this.events = new Emitter();
    this.id = data.id || null;
    this.uid = data.uid || null;
    this.revision = data.revision;
    this.title = data.title || 'No Title';
    this.autoUpdate = data.autoUpdate;
    this.description = data.description;
    this.tags = data.tags || [];
    this.style = data.style || 'dark';
    this.timezone = data.timezone || '';
    this.editable = data.editable !== false;
    this.graphTooltip = data.graphTooltip || 0;
    this.time = data.time || { from: 'now-6h', to: 'now' };
    this.timepicker = data.timepicker || {};
    this.templating = this.ensureListExist(data.templating);
    this.annotations = this.ensureListExist(data.annotations);
    this.refresh = data.refresh;
    this.snapshot = data.snapshot;
    this.schemaVersion = data.schemaVersion || 0;
    this.version = data.version || 0;
    this.links = data.links || [];
    this.gnetId = data.gnetId || null;
    this.panels = _.map(data.panels || [], (panelData: any) => new PanelModel(panelData));

    this.initMeta(meta);
    this.sortPanelsByGridPos();
  }

  private initMeta(meta?: DashboardMeta) {
    meta = meta || {};

    meta.canShare = meta.canShare !== false;
    meta.canSave = meta.canSave !== false;
    meta.canStar = meta.canStar !== false;
    meta.canEdit = meta.canEdit !== false;
    meta.showSettings = meta.canEdit;
    meta.canMakeEditable = meta.canSave && !this.editable;

    if (!this.editable) {
      meta.canEdit = false;
      meta.canDelete = false;
      meta.canSave = false;
    }

    this.meta = meta;
  }

  // cleans meta data and other non persistent state
  getSaveModelClone(options?: CloneOptions): DashboardModel {
    const defaults = _.defaults(options || {}, {
      saveVariables: true,
      saveTimerange: true,
    });

    // make clone
    let copy: any = {};
    for (const property in this) {
      if (DashboardModel.nonPersistedProperties[property] || !this.hasOwnProperty(property)) {
        continue;
      }

      copy[property] = _.cloneDeep(this[property]);
    }

    if (!defaults.saveTimerange) {
      copy.time = this.originalTime;
    }

    // get panel save models
    copy.panels = this.panels
      .filter((panel: PanelModel) => panel.type !== 'add-panel')
      .map((panel: PanelModel) => {
        // If we save while editing we should include the panel in edit mode instead of the
        // unmodified source panel
        if (this.panelInEdit && this.panelInEdit.editSourceId === panel.id) {
          const saveModel = this.panelInEdit.getSaveModel();
          // while editing a panel we modify its id, need to restore it here
          saveModel.id = this.panelInEdit.editSourceId;
          return saveModel;
        }

        return panel.getSaveModel();
      });

    //  sort by keys
    copy = sortByKeys(copy);
    copy.getVariables = () => {
      return copy.templating.list;
    };

    return copy;
  }

  startRefresh() {
    this.events.emit(PanelEvents.refresh);

    if (this.panelInEdit) {
      this.panelInEdit.refresh();
      return;
    }

    for (const panel of this.panels) {
      if (!this.otherPanelInFullscreen(panel)) {
        panel.refresh();
      }
    }
  }

  render() {
    this.events.emit(PanelEvents.render);

    for (const panel of this.panels) {
      panel.render();
    }
  }

  panelInitialized(panel: PanelModel) {
    panel.initialized();

    if (this.panelInEdit === panel) {
        panel.refresh();
    } else {
      // refresh new panels unless we are in fullscreen / edit mode
      if (!this.otherPanelInFullscreen(panel)) {
        panel.refresh();
      }
    }
  }

  otherPanelInFullscreen(panel: PanelModel) {
    return (this.panelInEdit || this.panelInView) && !(panel.isViewing || panel.isEditing);
  }

  initEditPanel(sourcePanel: PanelModel): PanelModel {
    this.panelInEdit = sourcePanel.getEditClone();
    return this.panelInEdit;
  }

  initViewPanel(panel: PanelModel) {
    this.panelInView = panel;
    panel.setIsViewing(true);
  }

  exitViewPanel(panel: PanelModel) {
    this.panelInView = undefined;
    panel.setIsViewing(false);
  }

  exitPanelEditor() {
    this.panelInEdit = undefined;
  }

  private ensureListExist(data: any) {
    if (!data) {
      data = {};
    }
    if (!data.list) {
      data.list = [];
    }
    return data;
  }

  getNextPanelId() {
    let max = 0;

    for (const panel of this.panels) {
      if (panel.id > max) {
        max = panel.id;
      }

      if (panel.collapsed) {
        for (const rowPanel of panel.panels) {
          if (rowPanel.id > max) {
            max = rowPanel.id;
          }
        }
      }
    }

    return max + 1;
  }

  forEachPanel(callback: (panel: PanelModel, index: number) => void) {
    for (let i = 0; i < this.panels.length; i++) {
      callback(this.panels[i], i);
    }
  }

  getPanelById(id: number): PanelModel | null {
    if (this.panelInEdit && this.panelInEdit.id === id) {
      return this.panelInEdit;
    }

    for (const panel of this.panels) {
      if (panel.id === id) {
        return panel;
      }
    }
    return null;
  }

  canEditPanel(panel?: PanelModel): boolean {
    return (this.meta.canEdit && panel !== undefined) || false;
  }

  canEditPanelById(id: number): boolean {
      const panel = this.getPanelById(id);
    return this.canEditPanel(panel || undefined);
  }

  addPanel(panelData: any) {
    panelData.id = this.getNextPanelId();

    const panel = new PanelModel(panelData);

    this.panels.unshift(panel);

    this.sortPanelsByGridPos();

    this.events.emit(panelAdded, panel);
  }

  sortPanelsByGridPos() {
    this.panels.sort((panelA, panelB) => {
      if (panelA.gridPos.y === panelB.gridPos.y) {
        return panelA.gridPos.x - panelB.gridPos.x;
      } else {
        return panelA.gridPos.y - panelB.gridPos.y;
      }
    });
  }

  getSelectedVariableOptions(variable: any) {
    let selectedOptions: any[];
    if (variable.current.text === 'All') {
      selectedOptions = variable.options.slice(1, variable.options.length);
    } else {
      selectedOptions = _.filter(variable.options, { selected: true });
    }
    return selectedOptions;
  }

  getRowHeight(rowPanel: PanelModel): number {
    if (!rowPanel.panels || rowPanel.panels.length === 0) {
      return 0;
    }
    const rowYPos = rowPanel.gridPos.y;
    const positions = _.map(rowPanel.panels, 'gridPos');
    const maxPos = _.maxBy(positions, (pos: GridPos) => {
      return pos.y + pos.h;
    }) || {y: 0, h: 0};
    return maxPos.y + maxPos.h - rowYPos;
  }

  removePanel(panel: PanelModel) {
    const index = _.indexOf(this.panels, panel);
    this.panels.splice(index, 1);
    this.events.emit(panelRemoved, panel);
  }

  removeRow(row: PanelModel, removePanels: boolean) {
    const needToogle = (!removePanels && row.collapsed) || (removePanels && !row.collapsed);

    if (needToogle) {
      this.toggleRow(row);
    }

    this.removePanel(row);
  }

  expandRows() {
    for (let i = 0; i < this.panels.length; i++) {
      const panel = this.panels[i];

      if (panel.type !== 'row') {
        continue;
      }

      if (panel.collapsed) {
        this.toggleRow(panel);
      }
    }
  }

  collapseRows() {
    for (let i = 0; i < this.panels.length; i++) {
      const panel = this.panels[i];

      if (panel.type !== 'row') {
        continue;
      }

      if (!panel.collapsed) {
        this.toggleRow(panel);
      }
    }
  }

  setPanelFocus(id: number) {
    this.meta.focusPanelId = id;
  }

  updateSubmenuVisibility() {
    this.meta.submenuEnabled = (() => {
      if (this.links.length > 0) {
        return true;
      }

      const visibleVars = _.filter(this.templating.list, (variable: any) => variable.hide !== 2);
      if (visibleVars.length > 0) {
        return true;
      }

      const visibleAnnotations = _.filter(this.annotations.list, (annotation: any) => annotation.hide !== true);
      if (visibleAnnotations.length > 0) {
        return true;
      }

      return false;
    })();
    this.events.emit(CoreEvents.submenuVisibilityChanged, this.meta.submenuEnabled);
  }

  getPanelInfoById(panelId: number) {
    for (let i = 0; i < this.panels.length; i++) {
      if (this.panels[i].id === panelId) {
        return {
          panel: this.panels[i],
          index: i,
        };
      }
    }

    return null;
  }

  duplicatePanel(panel: PanelModel) {
    const newPanel = panel.getSaveModel();
    newPanel.id = this.getNextPanelId();

    delete newPanel.repeat;
    delete newPanel.repeatIteration;
    delete newPanel.repeatPanelId;
    delete newPanel.scopedVars;
    if (newPanel.alert) {
      delete newPanel.thresholds;
    }
    delete newPanel.alert;

    // does it fit to the right?
    if (panel.gridPos.x + panel.gridPos.w * 2 <= GRID_COLUMN_COUNT) {
      newPanel.gridPos.x += panel.gridPos.w;
    } else {
      // add below
      newPanel.gridPos.y += panel.gridPos.h;
    }

    this.addPanel(newPanel);
    return newPanel;
  }

  destroy() {
    this.events.removeAllListeners();
    for (const panel of this.panels) {
      panel.destroy();
    }
  }

  toggleRow(row: PanelModel) {
    const rowIndex = _.indexOf(this.panels, row);

    if (row.collapsed) {
      row.collapsed = false;

      if (row.panels.length > 0) {
        // Use first panel to figure out if it was moved or pushed
        const firstPanel = row.panels[0];
        const yDiff = firstPanel.gridPos.y - (row.gridPos.y + row.gridPos.h);

        // start inserting after row
        let insertPos = rowIndex + 1;
        // y max will represent the bottom y pos after all panels have been added
        // needed to know home much panels below should be pushed down
        let yMax = row.gridPos.y;

        for (const panel of row.panels) {
          // make sure y is adjusted (in case row moved while collapsed)
          // console.log('yDiff', yDiff);
          panel.gridPos.y -= yDiff;
          // insert after row
          this.panels.splice(insertPos, 0, new PanelModel(panel));
          // update insert post and y max
          insertPos += 1;
          yMax = Math.max(yMax, panel.gridPos.y + panel.gridPos.h);
        }

        const pushDownAmount = yMax - row.gridPos.y - 1;

        // push panels below down
        for (let panelIndex = insertPos; panelIndex < this.panels.length; panelIndex++) {
          this.panels[panelIndex].gridPos.y += pushDownAmount;
        }

        row.panels = [];

      }

      // sort panels
      this.sortPanelsByGridPos();

      // emit change event
      this.events.emit(CoreEvents.rowExpanded);
      return;
    }

    const rowPanels = this.getRowPanels(rowIndex);

    // remove panels
    _.pull(this.panels, ...rowPanels);
    // save panel models inside row panel
    row.panels = _.map(rowPanels, (panel: PanelModel) => panel.getSaveModel());
    row.collapsed = true;

    // emit change event
    this.events.emit(CoreEvents.rowCollapsed);
  }

  /**
   * Will return all panels after rowIndex until it encounters another row
   */
  getRowPanels(rowIndex: number): PanelModel[] {
    const rowPanels = [];

    for (let index = rowIndex + 1; index < this.panels.length; index++) {
      const panel = this.panels[index];

      // break when encountering another row
      if (panel.type === 'row') {
        break;
      }

      // this panel must belong to row
      rowPanels.push(panel);
    }

    return rowPanels;
  }

  autoFitPanels(viewHeight: number, kioskMode?: UrlQueryValue) {
    const currentGridHeight = Math.max(
      ...this.panels.map(panel => {
        return panel.gridPos.h + panel.gridPos.y;
      })
    );

    const navbarHeight = 55;
    const margin = 20;
    const submenuHeight = 50;

    let visibleHeight = viewHeight - navbarHeight - margin;

    // Remove submenu height if visible
    if (this.meta.submenuEnabled && !kioskMode) {
      visibleHeight -= submenuHeight;
    }

    // add back navbar height
    if (kioskMode && kioskMode !== KIOSK_MODE_TV) {
      visibleHeight += navbarHeight;
    }

    const visibleGridHeight = Math.floor(visibleHeight / (GRID_CELL_HEIGHT + GRID_CELL_VMARGIN));
    const scaleFactor = currentGridHeight / visibleGridHeight;

    this.panels.forEach((panel, i) => {
      panel.gridPos.y = Math.round(panel.gridPos.y / scaleFactor) || 1;
      panel.gridPos.h = Math.round(panel.gridPos.h / scaleFactor) || 1;
    });
  }

  expandParentRowFor(panelId: number) {
    for (const panel of this.panels) {
      if (panel.collapsed) {
        for (const rowPanel of panel.panels) {
          if (rowPanel.id === panelId) {
            this.toggleRow(panel);
            return;
          }
        }
      }
    }
  }
}