import { __assign, __read } from "tslib";
import { useCallback, useEffect, useRef, useState } from 'react';
import { pluginLog } from './utils';
export var usePlotPlugins = function () {
    /**
     * Map of registered plugins (via children)
     * Used to build uPlot plugins config
     */
    var _a = __read(useState({}), 2), plugins = _a[0], setPlugins = _a[1];
    // const registeredPlugins = useRef(0);
    // arePluginsReady determines whether or not all plugins has already registered and uPlot should be initialised
    var _b = __read(useState(false), 2), arePluginsReady = _b[0], setPluginsReady = _b[1];
    var cancellationToken = useRef();
    var checkPluginsReady = useCallback(function () {
        if (cancellationToken.current) {
            window.cancelAnimationFrame(cancellationToken.current);
        }
        /**
         * After registering plugin let's wait for all code to complete to set arePluginsReady to true.
         * If any other plugin will try to register, the previously scheduled call will be canceled
         * and arePluginsReady will be deferred to next animation frame.
         */
        cancellationToken.current = window.requestAnimationFrame(function () {
            setPluginsReady(true);
        });
    }, [cancellationToken, setPluginsReady]);
    var registerPlugin = useCallback(function (plugin) {
        pluginLog(plugin.id, false, 'register');
        if (plugins.hasOwnProperty(plugin.id)) {
            throw new Error(plugin.id + " that is already registered");
        }
        setPlugins(function (plugs) {
            var _a;
            return __assign(__assign({}, plugs), (_a = {}, _a[plugin.id] = plugin, _a));
        });
        checkPluginsReady();
        return function () {
            setPlugins(function (p) {
                pluginLog(plugin.id, false, 'unregister');
                delete p[plugin.id];
                return __assign({}, p);
            });
        };
    }, [setPlugins]);
    // When uPlot mounts let's check if there are any plugins pending registration
    useEffect(function () {
        checkPluginsReady();
        return function () {
            if (cancellationToken.current) {
                window.cancelAnimationFrame(cancellationToken.current);
            }
        };
    }, []);
    return {
        arePluginsReady: arePluginsReady,
        plugins: plugins,
        registerPlugin: registerPlugin,
    };
};
//# sourceMappingURL=hooks.js.map