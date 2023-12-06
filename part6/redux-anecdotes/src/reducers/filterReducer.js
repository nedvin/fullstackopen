const initialState = "";

export const createFilterUpdate = (filter) => {
  return { type: "FILTER_UPDATE", payload: filter };
};

const filterReducer = (state = initialState, action) => {
  if (action.type === "FILTER_UPDATE") {
    return action.payload;
  }

  return state;
};

export default filterReducer;
