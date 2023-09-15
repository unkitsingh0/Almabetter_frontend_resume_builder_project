import React from "react";
import { FormControl, FormHelperText } from "@mui/material";
import "./Select.css";

// Define a functional component named Select Component that accepts props as its parameter.
const Select = (props) => {
  // Render the component's JSX structure.
  return (
    // Render a div with the class name "select-component."
    <div className="select-component">
      {/* Render a paragraph element displaying the title for the select input, provided through props. */}
      <p className="select-title">{props.title}</p>
      {/* Use FormControl to wrap the select input, allowing control of styling and error state. */}
      <FormControl fullWidth error={props.error}>
        {/* Render the select input or other child components passed within props.children. */}
        {props.children}
        {/* Display an error message (if any) below the select input. */}
        <FormHelperText>{props.errorMessage}</FormHelperText>
      </FormControl>
    </div>
  );
};

export default Select;
