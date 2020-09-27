import React, { FC, useCallback, useMemo, useRef } from 'react';
import { DashboardModel, PanelModel } from '../../state';
import { PanelData, PanelPlugin } from '@savantly/sprout-api';
import { Counter, DataLinksInlineEditor, Field, Input, RadioButtonGroup, Select, Switch, TextArea } from '@grafana/ui';
import { PanelOptionsEditor } from './PanelOptionsEditor';
import { VisualizationTab } from './VisualizationTab';
import { OptionsGroup } from './OptionsGroup';

interface Props {
  panel: PanelModel;
  plugin: PanelPlugin;
  data?: PanelData;
  dashboard: DashboardModel;
  onPanelConfigChange: (configKey: string, value: any) => void;
  onPanelOptionsChanged: (options: any) => void;
}

export const PanelOptionsTab: FC<Props> = ({
  panel,
  plugin,
  data,
  dashboard,
  onPanelConfigChange,
  onPanelOptionsChanged,
}) => {
  const visTabInputRef = useRef<HTMLInputElement>(null);
  const onRepeatRowSelectChange = useCallback((value: string | null) => onPanelConfigChange('repeat', value), [
    onPanelConfigChange,
  ]);
  const elements: JSX.Element[] = [];

  const directionOptions = [
    { label: 'Horizontal', value: 'h' },
    { label: 'Vertical', value: 'v' },
  ];

  const maxPerRowOptions = [2, 3, 4, 6, 8, 12].map(value => ({ label: value.toString(), value }));

  const focusVisPickerInput = (isExpanded: boolean) => {
    if (isExpanded && visTabInputRef.current) {
      visTabInputRef.current.focus();
    }
  };
  // Fist common panel settings Title, description
  elements.push(
    <OptionsGroup title="Settings" id="Panel settings" key="Panel settings">
      <Field label="Panel title">
        <Input css={null} defaultValue={panel.title} onBlur={e => onPanelConfigChange('title', e.currentTarget.value)} />
      </Field>
      <Field label="Description" description="Panel description supports markdown and links.">
        <TextArea css={null}
          defaultValue={panel.description}
          onBlur={e => onPanelConfigChange('description', e.currentTarget.value)}
        />
      </Field>
      <Field label="Transparent" description="Display panel without a background.">
        <Switch css={null} value={panel.transparent} onChange={e => onPanelConfigChange('transparent', e.currentTarget.checked)} />
      </Field>
    </OptionsGroup>
  );

  elements.push(
    <OptionsGroup title="Visualization" id="Panel type" key="Panel type" defaultToClosed onToggle={focusVisPickerInput}>
      {toggleExpand => <VisualizationTab panel={panel} ref={visTabInputRef} onToggleOptionGroup={toggleExpand} />}
    </OptionsGroup>
  );

  // Old legacy react editor
  if (plugin.editor && panel && !plugin.optionEditors) {
    elements.push(
      <OptionsGroup title="Options" id="legacy react editor" key="legacy react editor">
        <plugin.editor data={data} options={panel.getOptions()} onOptionsChange={onPanelOptionsChanged} />
      </OptionsGroup>
    );
  }

  if (plugin.optionEditors && panel) {
    elements.push(
      <PanelOptionsEditor
        key="panel options"
        options={panel.getOptions()}
        onChange={onPanelOptionsChanged}
        plugin={plugin}
      />
    );
  }

  return <>{elements}</>;
};
