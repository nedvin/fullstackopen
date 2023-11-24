import SearchBar from "./components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import SearchResult from "./components/SearchResult";

function App() {
  const [searchString, setSearchString] = useState("");
  const [countries, setCountries] = useState([]);
  const [result, setResult] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => response.data)
      .then((countries) => setCountries(countries));
  }, []);

  useEffect(() => {
    if (searchString === "") {
      setResult([]);
      return;
    }

    setResult(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(searchString.toLowerCase())
      )
    );
  }, [searchString]);

  const handleSearchChange = (event) => setSearchString(event.target.value);

  const handleShowCountry = (name) => {
    setSearchString(name);
  };

  return (
    <>
      <SearchBar
        searchString={searchString}
        handleSearchChange={handleSearchChange}
      />
      <SearchResult countries={result} handleShowCountry={handleShowCountry} />
    </>
  );
}

export default App;
