import { RouterState } from "connected-react-router";

export const getRouteParamsId = (state: RouterState) => state.location.routeParams?.id;
export const getRouteParamsPage = (state: RouterState) => state.location.routeParams?.page;
export const getRouteParams = (state: RouterState) => state.location.routeParams;
export const getLocationQuery = (state: RouterState) => state.location.query;
export const getUrl = (state: RouterState) => state.location.url;
