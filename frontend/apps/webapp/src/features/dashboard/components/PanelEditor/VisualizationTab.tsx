import { Field, Icon,Input, stylesFactory, useTheme } from '@sprout-platform/ui';
import { GrafanaTheme, PanelPlugin, PanelPluginMeta } from '@savantly/sprout-api';
import { css } from 'emotion';
import React, { useCallback, useState } from 'react';
import { connect, MapDispatchToProps, MapStateToProps } from 'react-redux';
import { StoreState } from '../../../../types';
import { filterPluginList, getAllPanelPluginMeta, VizTypePicker } from '../../panel_editor/VizTypePicker';
import { changePanelPlugin } from '../../state/actions';
import { PanelModel } from '../../state/PanelModel';

interface OwnProps {
  panel: PanelModel;
  onToggleOptionGroup: (expand: boolean) => void;
}

interface ConnectedProps {
  plugin?: PanelPlugin;
}

interface DispatchProps {
  changePanelPlugin: Function;
}

type Props = OwnProps & ConnectedProps & DispatchProps;

export const VisualizationTabUnconnected = React.forwardRef<HTMLInputElement, Props>(
  ({ panel, plugin, changePanelPlugin, onToggleOptionGroup }, ref) => {
    const [searchQuery, setSearchQuery] = useState('');
    const theme = useTheme();
    const styles = getStyles(theme);

    if (!plugin) {
      return null;
    }
    const onPluginTypeChange = (meta: PanelPluginMeta) => {
      if (meta.id === plugin.meta.id) {
        onToggleOptionGroup(false);
      } else {
        changePanelPlugin(panel, meta.id);
      }
    };

    const onKeyPress = useCallback(
      (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
          const query = e.currentTarget.value;
          const plugins = getAllPanelPluginMeta();
          const match = filterPluginList(plugins, query, plugin.meta);
          if (match && match.length) {
            onPluginTypeChange(match[0]);
          }
        }
      },
      [onPluginTypeChange, plugin]
    );

    const suffix =
      searchQuery !== '' ? (
        <span className={styles.searchClear} onClick={() => setSearchQuery('')}>
          <Icon name="times" />
          Clear filter
        </span>
      ) : null;

    return (
      <div className={styles.wrapper}>
        <Field>
          <Input
            css={null}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.currentTarget.value)}
            onKeyPress={onKeyPress}
            prefix={<Icon name="filter" className={styles.icon} />}
            suffix={suffix}
            placeholder="Filter visualizations"
            ref={ref}
          />
        </Field>

        <VizTypePicker
          current={plugin.meta}
          onTypeChange={onPluginTypeChange}
          searchQuery={searchQuery}
          onClose={() => {}}
        />
      </div>
    );
  }
);
const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    icon: css`
      color: ${theme.palette.gray33};
    `,
    wrapper: css`
      display: flex;
      flex-direction: column;
    `,
    searchClear: css`
      color: ${theme.palette.gray60};
      cursor: pointer;
    `
  };
});

const mapStateToProps: MapStateToProps<ConnectedProps, OwnProps, StoreState> = (state, props) => {
  return {
    plugin: state.plugins.panels[props.panel.type]
  };
};

const mapDispatchToProps: MapDispatchToProps<DispatchProps, OwnProps> = { changePanelPlugin };

export const VisualizationTab = connect(mapStateToProps, mapDispatchToProps, undefined, { forwardRef: true })(
  VisualizationTabUnconnected
);
