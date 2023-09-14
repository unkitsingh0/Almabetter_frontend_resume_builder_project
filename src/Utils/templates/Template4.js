import { Container, Paper } from "@mui/material";
import React from "react";
import TemplateHeader from "../../Components/Header/TemplateHeader";
import TemplateHeading from "../../Components/Heading/TemplateHeading";
import { data } from "../Data/data";
import TemplateOneExperienceComponent from "../../Components/TemplateOneExperience/TemplateOneExperience";
import TemplateEducationComponent from "../../Components/TemplateEducation/TemplateEducation";
import TemplateKeySkillComponent from "../../Components/TemplateKeySkill/TemplateKeySkill";
import "./Template.css";

const Template4 = (props) => {
  // Extracting data from props or using default data from "data" if not provided
  const personalinfo = props.personalinfo ?? data.personal_info;
  const workexperience = props.workexperience ?? data.work_experience;
  const educationinfo = props.educationinfo ?? data.education_details;
  const skills = props.skills ?? data.key_skills;

  const paperStyles = {
    width: { xs: "350px", sm: "400px", md: "450px", lg: "500px", xl: "600px" },
    height: {
      xs: "500px",
      sm: "550px",
      md: "600px",
      lg: "650px",
      xl: "700px",
    },
  };
  return (
    <Paper sx={paperStyles} id={`${props.index}report`} elevation={3}>
      {/* Template Header */}
      <TemplateHeader
        primaryColor={"#2196f3"}
        secondaryColor={"black"}
        bgColor={"white"}
        personalInfo={personalinfo}
        workExperience={workexperience}
      />
      <Container>
        {/* Professional Experience Section */}
        <TemplateHeading color={"#2196f3"} title={"Professional Experience"} />
        <ul style={{ marginBottom: 10 }}>
          {workexperience.map((experience) => {
            return (
              <TemplateOneExperienceComponent
                key={experience.jobTitle}
                experience={experience}
              />
            );
          })}
        </ul>
        {/* Education Section */}
        <TemplateHeading color={"#2196f3"} title={"Education"} />
        <TemplateEducationComponent education={educationinfo} />
        {/* Key Skills Section */}
        <TemplateHeading color={"#2196f3"} title={"Key Skills"} />
        <ul style={{ marginBottom: 10 }}>
          {skills.map((skill) => {
            return <TemplateKeySkillComponent key={skill} skill={skill} />;
          })}
        </ul>
      </Container>
    </Paper>
  );
};

export default Template4;
