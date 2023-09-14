import React from "react";
import { Container } from "@mui/material";
import "./TemplateOneExperience.css";

// Define a functional component named TemplateOneExperience Component that accepts props as its parameter.
const TemplateOneExperience = (props) => {
  return (
    // Render a container element with a specific class name.
    <Container className="template-one-experience-comp">
      {/* Render a list item containing work experience details. */}
      <li className="template-one-experience-comp">
        {/* Display the job title */}
        <h3 className="experience-heading">
          {props.experience.jobTitle}
          {/* Display the organization name */}
          <span className="experience-org-name">
            {props.experience.organizationName}
          </span>

          {/* Display the start and end years of the experience */}
          <span className="experience-start-end">
            ({props.experience.startYear} - {props.experience.endYear})
          </span>
        </h3>
      </li>
    </Container>
  );
};

export default TemplateOneExperience;
