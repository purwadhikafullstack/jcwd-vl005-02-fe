import { ADMINLOGIN, ADMINLOGOUT } from "./type";

// define initial value
const INITIAL_STATE = {
  id: "",
  username: "",
  email: "",
  first_name: "",
  last_name: "",
  is_verified: "",
//   created_at: "",
};

// 2. create Reducer
function adminReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case ADMINLOGIN:
      return {
        ...state,
        id: action.payload.id,
        username: action.payload.username,
        email: action.payload.email,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name,
        is_verified: action.payload.is_verified,
        // created_at: action.payload.created_at,
      };
    case ADMINLOGOUT:
      return INITIAL_STATE;

    default:
      return state;
  }
}
export default adminReducer;
