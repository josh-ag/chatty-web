import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import store from "./features/store";
import "@fontsource/outfit";

import "./index.css";

import App from "./App";

const container = document.getElementById("root");
const root = ReactDOMClient.createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
