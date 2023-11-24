const CountryName = ({ name, handleShowCountry }) => {
  return (
    <p>
      {name} <button onClick={handleShowCountry}>show</button>
    </p>
  );
};

export default CountryName;
