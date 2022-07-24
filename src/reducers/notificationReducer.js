export const INITIAL_STATE = {
  totalNotificationBadge: 0,
};

export const notificationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "UPDATE_BADGE":
      // console.log("Data masuk Reducer dari notificationAction :", action);
      // return data yang didapat dari action
      // console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
