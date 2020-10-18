import { AppRootProps, KeyValue, NavModelItem } from '@savantly/sprout-api';
import React, { FC, Fragment, ReactElement, useEffect } from 'react';
import { useInRouterContext } from 'react-router-dom';
import FormEditor from './FormEditor';
import CreateFormPage from './pages/CreateFormPage';

interface Props extends AppRootProps {
    children: ReactElement,
    params?: Record<string, string>
}

const TAB_CREATE = 'create';
const TAB_LIST = 'list';
const TAB_DEFAULT = 'default';

export const FormsAppPageWrapper = ({ path, onNavChanged, query, meta, params, children }: Props) => {
    useEffect(() => {
        const tabs: NavModelItem[] = [];
        tabs.push({
            text: 'Info',
            icon: 'fa fa-fw fa-file-text-o',
            url: '',
            id: TAB_DEFAULT,
        });
        tabs.push({
            text: 'List Forms',
            icon: 'fa fa-fw fa-file-text-o',
            url: TAB_LIST,
            id: TAB_LIST,
        });
        tabs.push({
            text: 'Edit Form',
            icon: 'fa fa-fw fa-file-text-o',
            url: 'form/123/edit',
            id: 'edit',
        });
        tabs.push({
            text: 'Create Forms',
            icon: 'fa fa-fw fa-file-text-o',
            url: TAB_CREATE,
            id: TAB_CREATE,
        });

        //const activeTab = query.tab || TAB_LIST;
        //tabs.forEach(tab => (tab.active = activeTab === tab.id));

        const node = {
            text: 'Form Management',
            img: `${meta.baseUrl}/${meta.info.logos.large}`,
            subTitle: 'Create and delete forms for the website',
            url: path,
            children: tabs,
        };

        // Update the page header
        onNavChanged({
            node: node,
            main: node,
        });
    }, [meta]);

    const inRouterContext = useInRouterContext();
    console.log(`FormRootPage in router context: ${inRouterContext}`);

    return (
        <Fragment>
            {children}
            <p>query: {JSON.stringify(query)}</p>
            <p>path: {path}</p>
            <p>params: {JSON.stringify(params)}</p>
            <p>meta: {JSON.stringify(meta)}</p>
        </Fragment>
    );
};

export const DefaultPage: FC<AppRootProps<KeyValue<any>>> = (props) => {

    const isInRouter = useInRouterContext();
    console.log(`TestComponent in router context: ${isInRouter}`);

    return (<div>Default Page</div>);
}

export const PluginRoutes = (props: AppRootProps<KeyValue<any>>) => {

    /*
    return (
        <>
            <Route path='create' element={<FormsAppPageWrapper {...props}><CreateFormPage {...props} /></FormsAppPageWrapper>} />
            <Route path='form/:formId/edit' element={<FormsAppPageWrapper {...props}><FormEditor {...props} /></FormsAppPageWrapper>} />
            <Route path='*' element={<FormsAppPageWrapper {...props}><DefaultPage {...props} /></FormsAppPageWrapper>} />
        </>
    );
    */

    return [{
        path: 'create',
        element: <FormsAppPageWrapper {...props}><CreateFormPage {...props} /></FormsAppPageWrapper>
    }, {
        path: 'form/:formId/edit',
        element: <FormsAppPageWrapper {...props}><FormEditor {...props} /></FormsAppPageWrapper>
    }, {
        path: '*',
        element: <FormsAppPageWrapper {...props}><DefaultPage {...props} /></FormsAppPageWrapper>
    }];
}