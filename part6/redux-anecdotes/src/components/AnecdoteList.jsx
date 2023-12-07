import { useDispatch, useSelector } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const selector = ({ anecdotes, filter }) => {
  return anecdotes.filter((anecdote) => anecdote.content.includes(filter));
};

const AnecdoteList = () => {
  const anecdotes = useSelector(selector).sort((a1, a2) => a2.votes - a1.votes);
  const dispatch = useDispatch();

  const handleVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(setNotification(`you voted '${anecdote.content}'`, 4));
  };

  return (
    <>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AnecdoteList;
