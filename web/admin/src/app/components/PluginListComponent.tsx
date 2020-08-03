import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import PluginCard from './PluginCard'
import { IRootState } from '../state/reducers'
import { IPlugin, PluginItemsState } from '../state/reducers/plugins'

export interface PluginListComponentProps extends StateProps, DispatchProps {
    plugins: PluginItemsState
}

class PluginListComponent extends Component<PluginListComponentProps> {
    
    render() {
        const { plugins } = this.props;
        return (
            <div>
                <div className="row">
                    {plugins.map(p => (
                        <PluginCard plugin={p} key={p.key} />
                    ))}
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({plugins}: IRootState) => ({
    plugins
});

const mapDispatchToProps = (dispatch:Function) => ({
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PluginListComponent);
