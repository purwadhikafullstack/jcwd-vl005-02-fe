import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import userReducer from "./userReducer";
import transactionsReducer from "./transactionsReducer";
import statusReducer from "./status";

export const Reducers = combineReducers({
  productReducer,
  user: userReducer,
  transactionsReducer,
  statusReducer,
});
