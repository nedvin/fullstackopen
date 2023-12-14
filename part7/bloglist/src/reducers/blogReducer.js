import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    addBlog(state, action) {
      state.push(action.payload);
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    deleteBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

const { setBlogs, addBlog, updateBlog, deleteBlog } = blogSlice.actions;

export const getAllBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch(addBlog(newBlog));
  };
};

export const likeBlog = (blogId) => {
  return async (dispatch, getState) => {
    const blog = getState().blogs.find((blog) => blog.id === blogId);
    const updatedBlog = await blogService.update({
      ...blog,
      user: blog.user.id,
      likes: blog.likes + 1,
    });
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlogById = (blogId) => {
  return async (dispatch) => {
    await blogService.deleteBlog(blogId);
    dispatch(deleteBlog(blogId));
  };
};

export default blogSlice.reducer;
