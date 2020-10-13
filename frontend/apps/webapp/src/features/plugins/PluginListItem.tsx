import React, { FC } from 'react';
import { PluginMeta } from '@savantly/sprout-api';
import { PluginSignatureBadge } from './PluginSignatureBadge';
import { Link } from 'react-router-dom';

interface Props {
  plugin: PluginMeta;
}

const PluginListItem: FC<Props> = (props) => {
  const { plugin } = props;

  return (
    <li className="card-item-wrapper">
      <Link className="card-item" to={`plugins/${plugin.id}/`}>
        <div className="card-item-header">
          <div className="card-item-type">{plugin.type}</div>
          <PluginSignatureBadge status={plugin.signature} />
          {plugin.hasUpdate && (
            <div className="card-item-notice">
              <span bs-tooltip="plugin.latestVersion">Update available!</span>
            </div>
          )}
        </div>
        <div className="card-item-body">
          <figure className="card-item-figure">
            <img src={`${plugin.baseUrl}/${plugin.info.logos.small}`} />
          </figure>
          <div className="card-item-details">
            <div className="card-item-name">{plugin.name}</div>
            <div className="card-item-sub-name">{`By ${plugin.info.author.name}`}</div>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default PluginListItem;
