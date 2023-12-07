import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";

const App = () => {
  const queryClient = useQueryClient();

  const { isLoading, isSuccess, isError, data } = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () =>
      axios
        .get("http://localhost:3001/anecdotes")
        .then((response) => response.data),
    retry: false,
  });

  const { mutate: vote } = useMutation({
    mutationFn: (anecdote) => {
      axios
        .put(`http://localhost:3001/anecdotes/${anecdote.id}`, {
          ...anecdote,
          votes: anecdote.votes + 1,
        })
        .then((response) => response.data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["anecdotes"]);
    },
  });

  if (isError) {
    return "anecdote service not available due to problems in server";
  }

  const handleVote = (anecdote) => {
    console.log(anecdote);
    vote(anecdote);
  };

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {isSuccess &&
        data.map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => handleVote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default App;
