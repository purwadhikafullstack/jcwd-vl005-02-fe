// fungsi action untuk mengarahkan data dari component ke reducer
export const updateBadge = (data) => {
  console.log("Data masuk Action dari component :", data);
  return {
    type: "UPDATE_BADGE",
    payload: data,
  };
};
