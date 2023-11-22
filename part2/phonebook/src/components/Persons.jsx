const Persons = ({ persons, filter }) => {
  const personsToShow =
    filter === ""
      ? persons
      : persons.filter((p) =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <ul>
      {personsToShow.map((person) => (
        <li key={person.name}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

export default Persons;
