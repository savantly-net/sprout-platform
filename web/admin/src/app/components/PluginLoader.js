import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { addPlugin, addRoute, addSidebarItem } from "../../state/actions";
import { getPlugins, getPluginPanelMarkup } from "../../api/server-plugin-service";
import HtmlPanel from './HtmlPanel';

class PluginLoader extends Component {

    loadPluginData = () => {
        getPlugins()
            .then(response => {
                const {clientConfig, plugins} = response.data;
                this.loadPlugins(plugins).then(()=>{
                    this.loadScripts(clientConfig.scripts).then(()=>{
                        console.log('completed loading scripts');

                        // load explicit routes from plugin
                        this.loadExplicitRoutes(clientConfig.routes).then(()=>{
                            console.log('loaded explicit plugin routes')
                            this.loadSidebar(clientConfig.navigationItems);
                        })
                        // implicit routes for all plugins
                        this.loadImplicitRoutes(plugins).then(()=>{
                            console.log('loaded implicit plugin routes');
                        })
                    });
                });
            });
    }

    async loadPlugins(items) {
        console.log('loading plugins: ' + items);
        for (const key in items) {
            if (items.hasOwnProperty(key)) {
                const item = items[key];
                this.props.dispatch(addPlugin(item));
            }
        }
    }

    async loadScripts(scripts) {
        console.log('loading scripts');
        const promises = [];
        scripts.forEach((scriptLocation) => {
            try {
                promises.push(this.evalPlugin(scriptLocation));
            } catch (error) {
                console.error('failed to import plugin script: ' + scriptLocation);
            }
        });
        return Promise.all(promises);
    }
    
    // evaluate the script to make the objects available
    async evalPlugin(scriptLocation){
        console.log('downloading script: ' + scriptLocation);
        return axios({
            method: 'get',
            url: scriptLocation,
            responseType: 'text'
        }).then(response => {
            console.log('eval\'ing script: ' + scriptLocation);
            eval(response.data);
        });
    }

    async loadImplicitRoutes(pluginMap) {
        console.log('loading routes: ' + pluginMap);
        for (const key in pluginMap) {
            if (pluginMap.hasOwnProperty(key)) {
                await getPluginPanelMarkup(key).then((response) => {
                    this.props.dispatch(addRoute({
                        path: '/plugins/' + key,
                        component: props => {
                            return <HtmlPanel content={response.data}/>
                        }
                    }));
                });
            }
        }
    }

    async loadExplicitRoutes(items) {
        console.log('loading routes: ' + items);
        items.forEach((item) => {
            this.props.dispatch(addRoute({
                path: item.path,
                component: eval(item.jsComponentClass).default
            }));
        });
    }

    async loadSidebar(items) {
        console.log('loading navigationItems: ' + items);
        items.forEach((item) => {
            this.props.dispatch(addSidebarItem(item));
        });
        console.log('loaded sidebar menu items');
    }

    componentDidMount(){
        this.loadPluginData();
    }

    render(){
        return (
            <div>{this.props.children}</div>
        )
    }
}

export default connect()(PluginLoader);