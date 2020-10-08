import React from "react";
import { Route } from "react-router-dom";
import AppRootPage from "./AppRootPage";

const PluginRoutes = () => {
  return (
    <>
      <Route
        exact
        path="/plugins"
        render={(props) => (
            <AppRootPage  />
        )}
      />
    </>
  );
};

export default PluginRoutes;
