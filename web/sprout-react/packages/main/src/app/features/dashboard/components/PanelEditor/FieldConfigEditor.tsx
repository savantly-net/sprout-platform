import React, { ReactNode, useCallback } from 'react';
import { get as lodashGet, cloneDeep } from 'lodash';
import {
  FieldConfigPropertyItem,
  FieldConfigSource,
  PanelPlugin,
  SelectableValue,
} from '@savantly/sprout-api';
import { Container, Counter, FeatureInfoBox, Field, fieldMatchersUI, Label, useTheme, ValuePicker } from '@grafana/ui';
import groupBy from 'lodash/groupBy';
import { OptionsGroup } from './OptionsGroup';
import { selectors } from '@grafana/e2e-selectors';
import { css } from 'emotion';
import { updateDefaultFieldConfigValue } from './utils';

interface Props {
  plugin: PanelPlugin;
  config: FieldConfigSource;
  onChange: (config: FieldConfigSource) => void;
}

export const DefaultFieldConfigEditor: React.FC<Props> = ({ onChange, config, plugin }) => {
  const onDefaultValueChange = useCallback(
    (name: string, value: any, isCustom: boolean | undefined) => {
      onChange(updateDefaultFieldConfigValue(config, name, value, isCustom));
    },
    [config, onChange]
  );

  const renderEditor = useCallback(
    (item: FieldConfigPropertyItem, categoryItemCount: number) => {
      if (item.isCustom && item.showIf && !item.showIf(config.defaults.custom)) {
        return null;
      }

      const defaults = config.defaults;
      const value = item.isCustom
        ? defaults.custom
          ? lodashGet(defaults.custom, item.path)
          : undefined
        : lodashGet(defaults, item.path);

      let label: ReactNode | undefined = (
        <Label description={item.description} category={item.category?.slice(1)}>
          {item.name}
        </Label>
      );

      // hide label if there is only one item and category name is same as item, name
      if (categoryItemCount === 1 && item.category?.[0] === item.name) {
        label = undefined;
      }

      return (
        <Field label={label} key={`${item.id}/${item.isCustom}`}>
          <item.editor
            item={item}
            value={value}
            onChange={v => onDefaultValueChange(item.path, v, item.isCustom)}
            context={{}}
          />
        </Field>
      );
    },
    [config]
  );

  const groupedConfigs = groupBy(plugin.fieldConfigRegistry.list(), i => i.category && i.category[0]);

  return (
    <div aria-label={selectors.components.FieldConfigEditor.content}>
      {Object.keys(groupedConfigs).map((k, i) => {
        const groupItemsCounter = countGroupItems(groupedConfigs[k], config);

        return (
          <OptionsGroup
            renderTitle={isExpanded => {
              return (
                <>
                  {k} {!isExpanded && groupItemsCounter && <Counter value={groupItemsCounter} />}
                </>
              );
            }}
            id={`${k}/${i}`}
            key={`${k}/${i}`}
          >
            {groupedConfigs[k].map(c => {
              return renderEditor(c, groupedConfigs[k].length);
            })}
          </OptionsGroup>
        );
      })}
    </div>
  );
};

const countGroupItems = (group: FieldConfigPropertyItem[], config: FieldConfigSource) => {
  let counter = 0;

  for (const item of group) {
    const value = item.isCustom
      ? config.defaults.custom
        ? config.defaults.custom[item.path]
        : undefined
      : (config.defaults as any)[item.path];
    if (item.getItemsCount && item.getItemsCount(value) > 0) {
      counter = counter + item.getItemsCount(value);
    }
  }

  return counter === 0 ? undefined : counter;
};
