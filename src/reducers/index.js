import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import userReducer from "./userReducer"

export const Reducers = combineReducers({
  productReducer,user:userReducer
});
