import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import { IRootState } from '../state/reducers';
import { addRoute, IRoute } from "../state/reducers/routes";
import { ISidebarItem, addSidebarItem } from "../state/reducers/sidebar";
import { getPlugins, getPluginPanelMarkup, UIRoute } from "../../api/server-plugin-service";
import HtmlPanel from './HtmlPanel';
import { IPlugin, PluginItemsState, addPlugin } from '../state/reducers/plugins';
import { INavigationItem, addNavigationItem } from '../state/reducers/navigation';

export interface PluginLoaderProps extends StateProps, DispatchProps {
    plugins: PluginItemsState,
    addPlugin: Function,
    addNavigationItem: Function,
    addRoute: Function,
    addSidebarItem: Function,
    children: any
}

class PluginLoader extends Component<PluginLoaderProps> {

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

    async loadPlugins(items: Array<IPlugin>) {
        console.log('loading plugins: ' + items);
        items.forEach(plugin => {
            this.props.addPlugin(plugin);
        });
    }

    async loadScripts(scripts: Array<string>) {
        console.log('loading scripts');
        const promises: Array<Promise<any>> = [];
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
    async evalPlugin(scriptLocation: string){
        console.log('downloading script: ' + scriptLocation);
        return axios({
            method: 'get',
            url: scriptLocation,
            responseType: 'text'
        }).then(response => {
            console.log('eval\'ing script: ' + scriptLocation);
            try {
                // eslint-disable-next-line
                eval(response.data);
            } catch (error) {
                console.error(error);
            }
        });
    }

    async loadImplicitRoutes(plugins: Array<IPlugin>) {
        console.log('loading routes: ' + plugins);
        return plugins.forEach(async (plugin) => {
            const response = await getPluginPanelMarkup(plugin.key);
            this.props.addRoute({
                path: '/plugins/' + plugin.key,
                component: () => {
                    return <HtmlPanel content={response.data} />;
                }
            });
        });
    }

    async loadExplicitRoutes(items: Array<UIRoute>) {
        console.log('loading routes: ' + items);
        items.forEach((item) => {
            try {
                this.props.addRoute({
                    path: item.path,
                    // eslint-disable-next-line
                    component: eval(item.jsComponentClass).default
                });
            } catch (error) {
                console.error(error);
            }
        });
    }

    async loadSidebar(items: Array<ISidebarItem>) {
        console.log('loading navigationItems: ' + items);
        items.forEach((item) => {
            this.props.addSidebarItem(item);
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

const mapStateToProps = ({plugins}: IRootState) => ({
    plugins
});

const mapDispatchToProps = (dispatch:Function) => ({
    addRoute: (route:IRoute) => dispatch(addRoute(route)),
    addPlugin: (plugin:IPlugin) => dispatch(addPlugin(plugin)),
    addNavigationItem: (navigationItem:INavigationItem) => dispatch(addNavigationItem(navigationItem)),
    addSidebarItem: (sidebarItem:ISidebarItem) => dispatch(addSidebarItem(sidebarItem))
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(PluginLoader);