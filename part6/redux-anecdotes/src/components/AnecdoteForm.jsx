import { useDispatch } from "react-redux";
import { saveAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const handleNewAnecdoteSubmit = async (event) => {
    event.preventDefault();
    const anecdote = event.target.note.value;
    event.target.note.value = "";
    dispatch(saveAnecdote(anecdote));
    dispatch(setNotification(`you created '${anecdote}'`, 4));
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
