import Country from "./Country";
import CountryName from "./CountryName";

const SearchResult = ({ countries, handleShowCountry }) => {
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }

  return countries.map((country) => {
    const name = country.name.common;
    return (
      <CountryName
        key={name}
        name={name}
        handleShowCountry={() => handleShowCountry(name)}
      />
    );
  });
};

export default SearchResult;
