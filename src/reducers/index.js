import { combineReducers } from "redux";
import { productReducer } from "./productReducer";
import userReducer from "./userReducer";
import transactionsReducer from "./transactionsReducer";
import statusReducer from "./status";
import adminReducer from "./adminReducer";
import manageUsersReducer from "./manageUsersReducer"

export const Reducers = combineReducers({
  productReducer,
  user: userReducer,
  transactionsReducer,
  statusReducer,
  adminReducer,
  manageUsersReducer
});
