import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { ServerPlugin } from '../../api/server-plugin-service'
import PluginCard from './PluginCard'

class PluginListComponent extends Component {
    
    static propTypes = {
        plugins: PropTypes.arrayOf(PropTypes.instanceOf(ServerPlugin))
    }

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

const mapStateToProps = state => ({
    plugins: state.plugins
})

const mapDispatchToProps = dispatch => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(PluginListComponent)
