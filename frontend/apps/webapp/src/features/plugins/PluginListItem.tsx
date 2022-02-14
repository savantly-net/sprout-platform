/* eslint-disable */
import React, { FC } from 'react';
/* eslint-enable */
import { PluginMeta, PluginType } from '@savantly/sprout-api';
import { useNavigate } from 'react-router-dom';
import { css, cx } from 'emotion';
import { Icon } from '@sprout-platform/ui';
import { Button } from 'reactstrap';

interface Props {
  plugin: PluginMeta;
}

const PluginListItem: FC<Props> = (props) => {
  const { plugin } = props;
  const navigate = useNavigate();

  return (
    <div
      className={cx(
        'card',
        'mb-3',
        css`
          min-width: 12rem;
        `
      )}
    >
      <img alt="no" src={`${plugin.baseUrl}/${plugin.info?.logos?.large}`} className={'card-img-top'} />
      <div className="card-body">
        <h5 className="card-title">{plugin.name}</h5>
        <div className="card-subtitle">
          <small>
            [{plugin.type}] {`By ${plugin.info?.author.name}`}
          </small>
        </div>
        <div className="card-text">{plugin.info?.description}</div>
      </div>
      <div className="card-footer d-flex justify-content-between">
        {plugin.type === PluginType.app && (
          <Button
            className="btn btn-primary"
            onClick={() => {
              navigate(`/a/${plugin.id}/`);
            }}
          >
            App
          </Button>
        )}
        <small className="text-muted">
          {plugin.hasUpdate && <span bs-tooltip="plugin.latestVersion">Update available!</span>}
        </small>
        <Button
          className="btn btn-secondary"
          onClick={() => {
            navigate(`./${plugin.id}/`);
          }}
        >
          <Icon name="cog" />
        </Button>
      </div>
    </div>
  );
};

export default PluginListItem;
