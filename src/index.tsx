import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "../src/styles/index.scss";
import {BrowserRouter, HashRouter} from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { RootState, store, useTypeDispatch } from "./store/store";
import { deleteName } from "./store/web-slices/profile_slice";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
