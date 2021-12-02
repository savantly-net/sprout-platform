import { NavModel, PluginMeta } from '@savantly/sprout-api';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Page from '../../core/components/Page/Page';
import { getNavModel } from '../../core/selectors/navModel';
import { StoreState } from '../../types';
import PluginList from './PluginList';

export interface Props {
  navModel: NavModel;
  plugins: PluginMeta[];
}

class PluginListPage extends PureComponent<Props> {
  render() {
    const { navModel, plugins } = this.props;
    return (
      <Page navModel={navModel}>
        <Page.Contents>
          <>{plugins && plugins && <PluginList plugins={plugins} />}</>
        </Page.Contents>
      </Page>
    );
  }
}

function mapStateToProps(state: StoreState) {
  return {
    navModel: getNavModel(state.navIndex, 'plugins')
  };
}

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PluginListPage);
