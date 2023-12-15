import { createSlice } from '@reduxjs/toolkit';
import login from '../services/login';
import blogService from '../services/blogs';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    addUserToState(state, action) {
      return action.payload;
    },
    clearUserFromState(state, action) {
      return null;
    },
  },
});

const { addUserToState, clearUserFromState } = userSlice.actions;

export const loadUserFromLocalStorage = () => {
  return (dispatch) => {
    const userFromStorage = window.localStorage.getItem('blogsAppUser');
    if (userFromStorage === null) {
      dispatch(clearUserFromState());
    } else {
      const user = JSON.parse(userFromStorage);
      dispatch(addUserToState(user));
      blogService.setToken(user.token);
    }
  };
};

export const logInUser = (username, password) => {
  return async (dispatch) => {
    const user = await login({ username, password });
    dispatch(addUserToState(user));
    blogService.setToken(user.token);
    window.localStorage.setItem('blogsAppUser', JSON.stringify(user));
  };
};

export const logOutUser = () => {
  return (dispatch) => {
    dispatch(clearUserFromState());
    window.localStorage.removeItem('blogsAppUser');
  };
};

export default userSlice.reducer;
