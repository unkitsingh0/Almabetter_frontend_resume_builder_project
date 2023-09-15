import { TextField } from "@mui/material";
import React from "react";
import "./Input.css";
import { inputChecks } from "../../Utils/inputChecks";

//This input Component is a reusable component for rendering input fields with titles and validation.
const Input = (props) => {
  // Render the component's JSX structure.
  return (
    <div className="input-component">
      <p className="input-title">{props.title}</p>
      <TextField
        variant="outlined"
        type={props.type}
        name={props.name}
        {...props.register(props.name, inputChecks(props.type, props.name))}
        multiline={props.multiline}
        rows={5}
        value={props.value}
        onChange={(e) => props.setValue(e.target.value.toString())}
        error={props.error}
        helperText={props.errorMessage ? props.errorMessage : null}
      />
    </div>
  );
};

export default Input;
