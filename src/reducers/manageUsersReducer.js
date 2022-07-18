import { DATA_USERS } from "./type";

// define initial value
const INITIAL_STATE = [];

// 2. create Reducer
export default function manageUsersReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    // export const  = "DATA_TRANSACTIONS";
    case DATA_USERS:
      return action.payload
    // case STATUS:
    //   return action.payload;

    default:
      return state;
  }
}

// export default transactionsReducer;
