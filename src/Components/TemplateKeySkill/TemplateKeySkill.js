import { Container } from "@mui/material";
import React from "react";
import "./TemplateKeySkill.css";

// Define a functional component named TemplateKeySkill Component that accepts props as its parameter.
const TemplateKeySkill = (props) => {
  // Render the component's JSX structure.
  return (
    // Render a container element to hold the key skill.
    <Container>
      <li className="skill">{props.skill}</li>
    </Container>
  );
};

export default TemplateKeySkill;
