import React from "react";
import "./TemplateHeading.css";

// TemplateHeading component displays a heading with a colored line underneath.
const TemplateHeading = (props) => {
  // Render the component's JSX structure.
  return (
    <div>
      <h2
        style={{ color: props.color }}
        className="professional-experience-heading"
      >
        {props.title}
      </h2>
      <hr style={{ backgroundColor: props.color }} className="vertical-line" />
    </div>
  );
};

export default TemplateHeading;
