import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: "",
  reducers: {
    createFilterUpdate(state, action) {
      return action.payload;
    },
  },
});

export const { createFilterUpdate } = filterSlice.actions;
export default filterSlice.reducer;
