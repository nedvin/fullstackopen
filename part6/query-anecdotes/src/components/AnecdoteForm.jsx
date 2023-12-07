import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotificationDispatch } from "../../NotificationContext";

const AnecdoteForm = () => {
  const notificationDispatch = useNotificationDispatch();

  const queryClient = useQueryClient();

  const { mutate: anecdoteMutation } = useMutation({
    mutationFn: (anecdote) =>
      axios
        .post("http://localhost:3001/anecdotes", anecdote)
        .then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
    onError: (error) => {
      notificationDispatch({
        type: "NEW_NOTIFICATION",
        payload: error.response.data.error,
      });
      setTimeout(
        () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
        5000
      );
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    anecdoteMutation({ content: content, votes: 0 });
    notificationDispatch({
      type: "NEW_NOTIFICATION",
      payload: `anecdote '${content}' created`,
    });
    setTimeout(
      () => notificationDispatch({ type: "CLEAR_NOTIFICATION" }),
      5000
    );
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
