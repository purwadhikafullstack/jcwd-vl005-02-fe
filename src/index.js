import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Reducers } from "./reducers";

const storeReducer = createStore(Reducers);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={storeReducer}>
    <App />
  </Provider>
);
