import { useState } from "react";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import Persons from "./components/Persons";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");

  const isPersonInPhoneBook = (name) =>
    persons.find((person) => person.name === name) !== undefined;

  const addNewPerson = (event) => {
    event.preventDefault();
    if (isPersonInPhoneBook(newName)) {
      alert(`${newName} is already in the phone book`);
    } else {
      setPersons(persons.concat({ name: newName, number: newPhoneNumber }));
    }
  };

  const handleFilterInput = (event) => setNameFilter(event.target.value);

  const handleNameInput = (event) => setNewName(event.target.value);

  const handleNumberInput = (event) => setNewPhoneNumber(event.target.value);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={nameFilter} onChange={handleFilterInput} />
      <h3>add new</h3>
      <PersonForm
        name={newName}
        number={newPhoneNumber}
        onSubmit={addNewPerson}
        onNameChange={handleNameInput}
        onNumberChange={handleNumberInput}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} filter={nameFilter} />
    </div>
  );
};

export default App;
