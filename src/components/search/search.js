import React, { useState } from "react";
import TextFiled from "@mui/material/TextField";
import "./search.css";

const Search = ({ onSearchChange }) => {
  const [search, setSearch] = useState([]);

  const handleOnChange = (e) => {
    setSearch(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSearchChange(search);
    }
  };

  return (
    <div className="search-container">
      <TextFiled
        variant="outlined"
        fullWidth
        label="Search for city"
        onChange={handleOnChange}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
};

export default Search;
