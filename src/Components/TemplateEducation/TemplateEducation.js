import React from "react";
import "./TemplateEducation.css";

// Define a functional component named TemplateEducation Component that accepts props as its parameter.
const TemplateEducation = (props) => {
  return (
    // Render the education details in a styled format.
    <h3 className="template-education-details">
      {/* Display the education degree and domain. */}
      {props.education.degree} in {props.education.domain}
      {/* Display the university. */}
      <span className="template-education-university">
        {props.education.university}
      </span>
      {/* Display the start and end years of education. */}
      <span className="education-start-end">
        ({props.education.startYear} - {props.education.endYear})
      </span>
    </h3>
  );
};

export default TemplateEducation;
