import set from 'lodash/set';
import { ComponentClass, ComponentType } from 'react';
import {
    PanelEditorProps,
    PanelMigrationHandler,
    PanelOptionEditorsRegistry,
    PanelPluginMeta,
    PanelProps,
    PanelTypeChangedHandler, SproutPlugin
} from '../types';
import { PanelOptionsEditorBuilder } from '../utils/OptionsUIBuilders';
  
  export class PanelPlugin<TOptions = any> extends SproutPlugin<
    PanelPluginMeta
  > {
    private _defaults?: TOptions;
  
    private _optionEditors?: PanelOptionEditorsRegistry;
    private registerOptionEditors?: (builder: PanelOptionsEditorBuilder<TOptions>) => void;
  
    panel: ComponentType<PanelProps<TOptions>> | null;
    editor?: ComponentClass<PanelEditorProps<TOptions>>;
    onPanelMigration?: PanelMigrationHandler<TOptions>;
    onPanelTypeChanged?: PanelTypeChangedHandler<TOptions>;
    noPadding?: boolean;
  
    constructor(panel: ComponentType<PanelProps<TOptions>> | null) {
      super();
      this.panel = panel;
    }

    set defaults(defaults: any) {
      this._defaults = defaults;
    }
  
    get defaults() {
      let result = this._defaults || {};
  
      if (!this._defaults) {
        const editors = this.optionEditors;
  
        if (!editors || editors.list().length === 0) {
          return null;
        }
  
        for (const editor of editors.list()) {
          set(result, editor.id, editor.defaultValue);
        }
      }
      return result;
    }

    get optionEditors(): PanelOptionEditorsRegistry {
      if (!this._optionEditors) {
        const builder = new PanelOptionsEditorBuilder<TOptions>();
        this._optionEditors = builder.getRegistry();
  
        if (this.registerOptionEditors) {
          this.registerOptionEditors(builder);
        }
      }
  
      return this._optionEditors;
    }
  
    setNoPadding() {
      this.noPadding = true;
      return this;
    }
  
    /**
     * This function is called before the panel first loads if
     * the current version is different than the version that was saved.
     *
     * This is a good place to support any changes to the options model
     */
    setMigrationHandler(handler: PanelMigrationHandler) {
      this.onPanelMigration = handler;
      return this;
    }
  
    /**
     * This function is called when the visualization was changed. This
     * passes in the panel model for previous visualisation options inspection
     * and panel model updates.
     *
     * This is useful for supporting PanelModel API updates when changing
     * between Angular and React panels.
     */
    setPanelChangeHandler(handler: PanelTypeChangedHandler) {
      this.onPanelTypeChanged = handler;
      return this;
    }
  
    /**
     * Enables panel options editor creation
     *
     * @example
     * ```typescript
     *
     * import { ShapePanel } from './ShapePanel';
     *
     * interface ShapePanelOptions {}
     *
     * export const plugin = new PanelPlugin<ShapePanelOptions>(ShapePanel)
     *   .setPanelOptions(builder => {
     *     builder
     *       .addSelect({
     *         id: 'shape',
     *         name: 'Shape',
     *         description: 'Select shape to render'
     *         settings: {
     *           options: [
     *             {value: 'circle', label: 'Circle' },
     *             {value: 'square', label: 'Square },
     *             {value: 'triangle', label: 'Triangle }
     *            ]
     *         },
     *       })
     *   })
     * ```
     *
     * @public
     **/
    setPanelOptions(builder: (builder: PanelOptionsEditorBuilder<TOptions>) => void) {
      // builder is applied lazily when options UI is created
      this.registerOptionEditors = builder;
      return this;
    }

  }