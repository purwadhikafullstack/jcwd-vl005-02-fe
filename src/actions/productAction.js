// fungsi action untuk mengarahkan data dari component ke reducer
export const productData = (data) => {
  // console.log("Data masuk Action dari component :", data);
  return {
    type: "DATA_FETCH",
    payload: data,
  };
};
