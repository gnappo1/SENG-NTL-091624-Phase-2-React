import React from "react";

const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <input
      id="search-bar"
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={e => handleSearch(e)}
    />
  );
};

export default SearchBar;
