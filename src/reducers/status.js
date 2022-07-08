import { DATA_TRANSACTIONS, DATA_TRANSACTIONS_MONTH, STATUS } from "./type";
const STATUS_STATE = "";
export default function statusReducer(state = STATUS_STATE, action) {
  switch (action.type) {
    case STATUS:
      return action.payload;

    default:
      return state;
  }
}