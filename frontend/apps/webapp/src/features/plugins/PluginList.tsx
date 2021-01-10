import React, { FC } from 'react';
import PluginListItem from './PluginListItem';
import { PluginMeta } from '@savantly/sprout-api';

interface Props {
  plugins: PluginMeta[];
}

const PluginList: FC<Props> = (props) => {
  const { plugins } = props;

  return (
    <section>
      <div className="row card-deck">
        {plugins.map((plugin, index) => {
          return <PluginListItem plugin={plugin} key={`${plugin.name}-${index}`} />;
        })}
      </div>
    </section>
  );
};

export default PluginList;
