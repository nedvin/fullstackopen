import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    clearNotification() {
      return "";
    },
  },
});

const { createNotification, clearNotification } = notificationSlice.actions;

export const setNotification = (message, displayTimeInSeconds) => {
  return (dispatch) => {
    dispatch(createNotification(message));
    setTimeout(
      () => dispatch(clearNotification()),
      displayTimeInSeconds * 1000
    );
  };
};
export default notificationSlice.reducer;
