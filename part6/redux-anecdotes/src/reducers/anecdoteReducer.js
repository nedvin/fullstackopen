import { createSlice } from "@reduxjs/toolkit";

const getId = () => (100000 * Math.random()).toFixed(0);

const anecdotesSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    createVote(state, action) {
      const anecdote = state.find((anecdote) => anecdote.id === action.payload);
      const upVotedAnecdote = { ...anecdote, votes: anecdote.votes + 1 };

      return state.map((anecdote) =>
        anecdote.id !== action.payload ? anecdote : upVotedAnecdote
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

export const { createVote, createAnecdote, setAnecdotes } =
  anecdotesSlice.actions;
export default anecdotesSlice.reducer;
