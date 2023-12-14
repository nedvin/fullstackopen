import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { message: '', isError: false },
  reducers: {
    createNotification(state, action) {
      return action.payload;
    },
    removeNotification(state, action) {
      return {
        message: '',
        isError: false,
      };
    },
  },
});

const { createNotification, removeNotification } = notificationSlice.actions;

export const showNotification = (notificationMessage, isError) => {
  return async (dispatch) => {
    dispatch(createNotification({ message: notificationMessage, isError }));
    setTimeout(() => dispatch(removeNotification()), 5000);
  };
};

export default notificationSlice.reducer;
