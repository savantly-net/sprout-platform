import React, { FC } from 'react';
import { PluginMeta } from '@savantly/sprout-api';
import { PluginSignatureBadge } from './PluginSignatureBadge';
import { Link } from 'react-router-dom';
import { css } from 'emotion';

interface Props {
  plugin: PluginMeta;
}

const PluginListItem: FC<Props> = (props) => {
  const { plugin } = props;

  return (
    <li>
      <div>
        <div>
          <Link to={`./${plugin.id}/`}>Information</Link>
        </div>
        <div>
          <Link to={`/a/${plugin.id}/`}>Application Page</Link>
        </div>
        <div className="card-item-header">
          <div className="card-item-type">
            <small>[{plugin.type}]</small>
          </div>
          <PluginSignatureBadge status={plugin.signature} />
          {plugin.hasUpdate && (
            <div className="card-item-notice">
              <span bs-tooltip="plugin.latestVersion">Update available!</span>
            </div>
          )}
        </div>
        <div className="card-item-body">
          <figure className="card-item-figure">
            <img
              src={`${plugin.baseUrl}/${plugin.info.logos.small}`}
              className={css`
                max-width: 50px;
              `}
            />
          </figure>
          <div className="card-item-details">
            <div className="card-item-name">{plugin.name}</div>
            <div className="card-item-sub-name">{`By ${plugin.info.author.name}`}</div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default PluginListItem;
