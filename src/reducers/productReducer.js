export const INITIAL_STATE = {
  name: "",
  description: "",
  category: "",
  price: "",
  stock: "",
  volume: "",
  unit: "",
};

export const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "DATA_FETCH":
      // console.log("Data masuk Reducer dari resturantAction :", action);
      // return data yang didapat dari action
      // console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
