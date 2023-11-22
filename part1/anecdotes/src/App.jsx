import { useState } from "react";

const Anecdote = ({ header, anecdote, votes }) => (
  <>
    <h2>{header}</h2>
    <p>{anecdote}</p>
    <p>has {votes} votes</p>
  </>
);

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
    "The only way to go fast, is to go well.",
  ];

  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const getNextAnecdote = () => {
    let next = selected;
    while (
      (next = Math.floor(Math.random() * anecdotes.length)) === selected
    ) {}
    setSelected(next);
  };

  const handleVote = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  const findMostPopularAnecdote = () => {
    let index = 0;
    let maxNumberOfVotes = 0;
    for (let i = 0; i < anecdotes.length; i++) {
      if (votes[i] > maxNumberOfVotes) {
        maxNumberOfVotes = votes[i];
        index = i;
      }
    }

    return index;
  };

  const indexOfMostPopularAnecdote = findMostPopularAnecdote();

  return (
    <>
      <Anecdote
        anecdote={anecdotes[selected]}
        votes={votes[selected]}
        header={"Anecdote of the day"}
      />
      <button onClick={getNextAnecdote}>next anecdote</button>
      <button onClick={handleVote}>vote</button>
      <Anecdote
        anecdote={anecdotes[indexOfMostPopularAnecdote]}
        votes={votes[indexOfMostPopularAnecdote]}
        header={"Anecdote with most votes"}
      />
    </>
  );
};

export default App;
