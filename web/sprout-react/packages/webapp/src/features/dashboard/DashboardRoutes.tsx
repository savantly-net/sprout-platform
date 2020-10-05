import React from "react";
import { Route } from "react-router-dom";
import { DashboardRouteInfo } from "../../types";
import DashboardProvider from "./containers/DashboardProvider";

const DashboardRoutes = () => {
  return (
    <>
      <Route
        exact
        path="/"
        render={(props) => (
          <DashboardProvider routeInfo={DashboardRouteInfo.Home} {...props} />
        )}
      />
      <Route
        exact
        path="/d/:uid"
        render={(props) => (
          <DashboardProvider routeInfo={DashboardRouteInfo.Normal} {...props} />
        )}
      />
      <Route
        exact
        path="/d/:uid/:slug"
        render={(props) => (
          <DashboardProvider routeInfo={DashboardRouteInfo.Normal} {...props} />
        )}
      />
      <Route
        exact
        path="/dashboard/new"
        render={(props) => (
          <DashboardProvider routeInfo={DashboardRouteInfo.New} {...props} />
        )}
      />
    </>
  );
};

export default DashboardRoutes;
