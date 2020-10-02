import {
  ErrorBoundaryAlert,
  getTheme,
  ModalRoot,
  ModalsProvider,
  ThemeContext
} from "@savantly/sprout-ui";
import { ConnectedRouter } from 'connected-react-router';
import React from "react";
import { Provider } from "react-redux";
import "./App.css";
//import './assets/stolen.css';
//import './sass/grafana.dark.scss';
import { ThemeProvider } from "./core/utils/ConfigProvider";
import { initDevFeatures } from "./dev";
import AppRoutes from "./routes/AppRoutes";
import { history } from "./store/configureStore";
import { store } from "./store/store";

const CRouter = ConnectedRouter as any;

export const App = ({ theme }: { theme: string }) => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log("enabling why-render");
    initDevFeatures();
  }

  return (
    <ThemeContext.Provider value={getTheme(theme)}>
      <Provider store={store}>
        <CRouter history={history}>
          <ErrorBoundaryAlert style="page">
            <ThemeProvider>
              <ModalsProvider>
                <AppRoutes history={history} />
                <ModalRoot />
              </ModalsProvider>
            </ThemeProvider>
          </ErrorBoundaryAlert>
        </CRouter>
      </Provider>
    </ThemeContext.Provider>
  );
};

export default App;
