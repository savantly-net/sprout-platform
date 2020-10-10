import { PanelData, PanelPlugin } from "@savantly/sprout-api";
import { config } from "@savantly/sprout-runtime";
import classNames from "classnames";
import React from "react";
import { PANEL_BORDER } from "../../../core/constants";
import { PanelModel } from "../state";

interface Props {
    panel: PanelModel;
    width: number;
    height: number;
    plugin: PanelPlugin;
    data: PanelData;
    renderCounter: number;
    hasOverlayHeader: boolean;
    onOptionsChange: (options: any) => void;
}

export const PanelRenderer = ({
    panel,
    width,
    height,
    plugin,
    data,
    renderCounter,
    hasOverlayHeader,
    onOptionsChange
}: Props) => {
    const { theme } = config;

    const PanelComponent = plugin.panel as any;
    const headerHeight = hasOverlayHeader ? 0 : theme.panelHeaderHeight;
    const chromePadding = plugin.noPadding ? 0 : theme.panelPadding;
    const panelWidth = width - chromePadding * 2 - PANEL_BORDER;
    const innerPanelHeight = height - headerHeight - chromePadding * 2 - PANEL_BORDER;
    const panelContentClassNames = classNames({
      'panel-content': true,
      'panel-content--no-padding': plugin.noPadding,
    });
    const panelOptions = panel.getOptions();

    return (
      <>
        <div className={panelContentClassNames}>
          <PanelComponent
            id={panel.id}
            data={data}
            title={panel.title}
            options={panelOptions}
            transparent={panel.transparent}
            width={panelWidth}
            height={innerPanelHeight}
            renderCounter={renderCounter}
            onOptionsChange={onOptionsChange}
          />
        </div>
      </>
    );
};