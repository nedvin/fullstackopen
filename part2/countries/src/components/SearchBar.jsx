const SearchBar = ({ searchString, handleSearchChange }) => {
  return (
    <div>
      find countries{" "}
      <input value={searchString} onChange={handleSearchChange} />
    </div>
  );
};

export default SearchBar;
