import { PopoverContent, Tooltip } from '@sprout-platform/ui';
import { getLocationSrv } from '@savantly/sprout-runtime';
import React, { Component } from 'react';
import { PanelModel } from '../../state/PanelModel';



enum InfoMode {
  Error = 'Error',
  Info = 'Info',
  Links = 'Links',
}

interface Props {
  panel: PanelModel;
  title?: string;
  description?: string;
  error?: string;
}

export class PanelHeaderCorner extends Component<Props> {
  getInfoMode = () => {
    const { panel, error } = this.props;
    if (error) {
      return InfoMode.Error;
    }
    if (!!panel.description) {
      return InfoMode.Info;
    }
    return undefined;
  };

  getInfoContent = (): JSX.Element => {
    const { panel } = this.props;
    const markdown = panel.description || '';

    return (
      <div className="panel-info-content markdown-html">
        <div dangerouslySetInnerHTML={{ __html: markdown }} />
      </div>
    );
  };

  /**
   * Open the Panel Inspector when we click on an error
   */
  onClickError = () => {
    getLocationSrv().update({ partial: true, query: { inspect: this.props.panel.id } });
  };

  renderCornerType(infoMode: InfoMode, content: PopoverContent, onClick?: () => void) {
    const theme = infoMode === InfoMode.Error ? 'error' : 'info';
    return (
      <Tooltip content={content} placement="top-start" theme={theme}>
        <div className={`panel-info-corner panel-info-corner--${infoMode.toLowerCase()}`} onClick={onClick}>
          <i className="fa" />
          <span className="panel-info-corner-inner" />
        </div>
      </Tooltip>
    );
  }

  render() {
    const { error } = this.props;
    const infoMode: InfoMode | undefined = this.getInfoMode();

    if (!infoMode) {
      return null;
    }

    if (infoMode === InfoMode.Error && error) {
      return this.renderCornerType(infoMode, error, this.onClickError);
    }

    if (infoMode === InfoMode.Info) {
      return this.renderCornerType(infoMode, this.getInfoContent);
    }

    return null;
  }
}

export default PanelHeaderCorner;
