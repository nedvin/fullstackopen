import { useDispatch, useSelector } from "react-redux";
import { createVote } from "../reducers/anecdoteReducer";
import {
  createNotification,
  clearNotification,
} from "../reducers/notificationReducer";

const selector = ({ anecdotes, filter }) => {
  return anecdotes
    .filter((anecdote) => anecdote.content.includes(filter))
    .sort((a1, a2) => a2.votes - a1.votes);
};

const AnecdoteList = () => {
  const anecdotes = useSelector(selector);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(createVote(anecdote.id));
    dispatch(createNotification(`you voted '${anecdote.content}'`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
