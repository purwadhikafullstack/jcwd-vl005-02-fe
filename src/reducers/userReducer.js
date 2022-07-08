import { LOGIN, LOGOUT } from "./type";

// define initial value
const INITIAL_STATE = {
  id: "",
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  is_verified: "",
  created_at: "",
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
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        is_verified: action.payload.is_verified,
        created_at: action.payload.created_at,
      };
    case LOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default userReducer;
