import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../service/anecdotesService";

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createVote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      );
    },
    createAnecdote(state, action) {
      state.push(action.payload);
    },
    setAnecdotes(state, action) {
      return action.payload;
    },
  },
});

const { createVote, setAnecdotes, createAnecdote } = anecdotesSlice.actions;

export const vote = (anecdote) => {
  return async (dispatch) => {
    const upVotedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1,
    });
    dispatch(createVote(upVotedAnecdote));
  };
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    anecdoteService.getAll().then((anecdotes) => {
      dispatch(setAnecdotes(anecdotes));
    });
  };
};

export const saveAnecdote = (anecdote) => {
  return async (dispatch) => {
    const savedAnecdote = await anecdoteService.create({
      content: anecdote,
      votes: 0,
    });
    dispatch(createAnecdote(savedAnecdote));
  };
};

export default anecdotesSlice.reducer;
