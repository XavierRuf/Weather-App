import React from "react";

function Search({ query, search, onChange }) {
  return (
    <div className="search-box">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        onChange={onChange}
        value={query}
        onKeyPress={search}
      />
    </div>
  );
}

export default Search;
