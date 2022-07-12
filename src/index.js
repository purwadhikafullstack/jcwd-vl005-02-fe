import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
// import { createStore } from "redux";
import { Reducers } from "./reducers";
import { BrowserRouter } from "react-router-dom";
// configure redux
import userReducer from "./redux/reducers/user-reducer";
import { createStore, combineReducers, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import { HelmetProvider } from 'react-helmet-async';

const storeReducer = createStore(Reducers);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <HelmetProvider>
      <BrowserRouter>
    <Provider store={storeReducer}>
      <App />
    </Provider>
  </BrowserRouter>

   </HelmetProvider>


);
