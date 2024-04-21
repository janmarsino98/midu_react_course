import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <div
      className="searchBar-container"
      onFocus={() => setIsFocused(!isFocused)}
      onBlur={() => setIsFocused(!isFocused)}
    >
      <div className="searchBar-iconContainer">
        <IoSearch color={isFocused ? "rgb(29,155,240)" : "white"} />
      </div>
      <input placeholder="Buscar" type="text" className="searchBar-input" />
    </div>
  );
};

export default SearchBar;
