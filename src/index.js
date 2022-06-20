import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { Reducers } from "./reducers";
import { DarkModeContextProvider } from "./context/darkModeContext";

const storeReducer = createStore(Reducers);

ReactDOM.render(
  <React.StrictMode>
    <DarkModeContextProvider>
      <Provider store={storeReducer}>
        <App />
      </Provider>
    </DarkModeContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
