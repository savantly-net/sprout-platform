import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { DashboardRouteInfo } from "../../types";
import DashboardProvider from "./containers/DashboardProvider";

const DashboardRoutes = () => {
  return (
    <Fragment>
      <Route
        path="d/:uid/*"
        element={<DashboardProvider routeInfo={DashboardRouteInfo.Normal} />}
      />
      <Route
        path="d/:uid/:slug"
        element={<DashboardProvider routeInfo={DashboardRouteInfo.Normal} />}
      />
      <Route
        path="dashboard/new"
        element={<DashboardProvider routeInfo={DashboardRouteInfo.New} />}
      />
    </Fragment>
  );
};

export default DashboardRoutes;
