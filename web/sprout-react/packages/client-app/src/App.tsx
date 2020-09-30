import { standardEditorsRegistry } from "@savantly/sprout-api";
import { config } from "@savantly/sprout-runtime";
import { ErrorBoundaryAlert, getStandardOptionEditors, getTheme, ModalRoot, ModalsProvider, ThemeContext } from "@savantly/sprout-ui";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import './assets/stolen.css';
import { ThemeProvider } from "./core/utils/ConfigProvider";
import { initDevFeatures } from "./dev";
import { builtInPluginMeta } from "./features/plugins/built_in_plugins";
import AppRoutes from "./routes/AppRoutes";
import { store } from "./store/store";


function App() {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log("enabling why-render");
    initDevFeatures();
  }
  
  document.body.classList.add('is-react');
  config.panels = builtInPluginMeta;
  standardEditorsRegistry.setInit(getStandardOptionEditors);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={getTheme("dark")}>
        <Provider store={store}>
          <ErrorBoundaryAlert style="page">
            <ThemeProvider>
              <ModalsProvider>
                <AppRoutes />
                <ModalRoot />
              </ModalsProvider>
            </ThemeProvider>
          </ErrorBoundaryAlert>
        </Provider>

        
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
