export const ADD_NAVIGATION_ITEM = "ADD_NAVIGATION_ITEM";
export const ADD_ROUTE = "ADD_ROUTE";
export const ADD_PLUGIN = "ADD_PLUGIN";
export const ADD_SIDEBAR_ITEM = "ADD_SIDEBAR_ITEM";
export const ADD_SCRIPT = "ADD_SCRIPT";

export function addNavigationItem(item) {
    return {
        type: ADD_NAVIGATION_ITEM,
        payload: item
    };
}

export function addRoute(item) {
    return {
        type: ADD_ROUTE,
        payload: item
    };
}

export function addPlugin(item) {
    return {
        type: ADD_PLUGIN,
        payload: item
    };
}

export function addSidebarItem(item) {
    return {
        type: ADD_SIDEBAR_ITEM,
        payload: item
    };
}

export function addScript(item) {
    return {
        type: ADD_SCRIPT,
        payload: item
    };
}