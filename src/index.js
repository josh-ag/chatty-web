import React from "react";
import * as ReactDOMClient from "react-dom/client";
import { Provider } from "react-redux";
import store from "./features/store";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
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
