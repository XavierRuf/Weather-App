import React from "react";
import { Form, FormControl } from "react-bootstrap";

function Search({ query, search, onChange }) {
  return (
    <Form className="search-box" xs={4}>
      <FormControl
        type="text"
        placeholder="Search..."
        onChange={onChange}
        value={query}
        onKeyPress={search}
      />
    </Form>
  );
}

export default Search;
