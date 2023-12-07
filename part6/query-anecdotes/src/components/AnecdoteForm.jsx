import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const { mutate: anecdoteMutation } = useMutation({
    mutationFn: (anecdote) =>
      axios
        .post("http://localhost:3001/anecdotes", anecdote)
        .then((response) => response.data),
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    anecdoteMutation({ content: content, votes: 0 });
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
