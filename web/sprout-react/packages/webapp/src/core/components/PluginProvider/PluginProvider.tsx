import React, { useMemo } from "react";
import { loadPlugins } from "../../../features/plugins/state/actions";

const ref = React.createRef();

export const PluginProvider: React.FC = ({children}) => {
    useMemo(() => loadPlugins(), [ref])
    return (
        <React.Fragment>
            {children}
        </React.Fragment>
    );
}