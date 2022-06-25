import { LOGIN, LOGOUT } from "../actions/types";

// define initial value
const INITIAL_STATE = {
  id: "",
  username: "",
  email: "",
};

// 2. create Reducer
function userReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
      };
    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default userReducer;
