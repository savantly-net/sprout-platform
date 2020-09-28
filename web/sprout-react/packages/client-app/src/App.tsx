import { getTheme, ThemeContext } from "@grafana/ui";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Page from "./core/components/Page/Page";
import { useNavModel } from "./core/hooks/useNavModel";
import { initDevFeatures } from "./dev";
import logo from "./logo.svg";

function App() {
  const navModel = useNavModel("home");
  if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
    console.log("enabling why-render");
    initDevFeatures();
  }

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={getTheme("dark")}>
        <Page navModel={navModel}>
          <header>
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.tsx</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </Page>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
