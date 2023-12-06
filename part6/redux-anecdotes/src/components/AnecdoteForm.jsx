import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  createNotification,
} from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdoteSubmit = (event) => {
    event.preventDefault();
    const anecdote = event.target.note.value;
    event.target.note.value = "";
    dispatch(createAnecdote(anecdote));
    dispatch(createNotification(`you created '${anecdote}'`));
    setTimeout(() => dispatch(clearNotification()), 5000);
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdoteSubmit}>
        <div>
          <input name="note" />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default AnecdoteForm;
