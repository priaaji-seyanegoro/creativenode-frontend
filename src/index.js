import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { createStore, StoreProvider } from "easy-peasy";
import { storeModel } from "./easy-peasy/model";

import { ColorModeProvider, ThemeProvider, CSSReset } from "@chakra-ui/core";
import * as serviceWorker from "./serviceWorker";

const store = createStore(storeModel);

ReactDOM.render(
  <StoreProvider store={store}>
    <BrowserRouter>
      <ThemeProvider>
        <ColorModeProvider>
          <CSSReset />
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ColorModeProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
