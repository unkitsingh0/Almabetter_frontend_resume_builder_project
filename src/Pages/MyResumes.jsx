import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Stack, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import JsPDF from "jspdf";
import Grid from "@mui/material/Grid";
import { connect } from "react-redux";
import { templates } from "../Utils/Data/templates";
import { Navbar, BlackScreen } from ".";
import {
  addAllExperience,
  addEducation,
  addPersonalInfo,
  editSkill,
  selectResume,
  selectTemplate,
} from "../Redux/Actions/actions";
import noResume from "../Utils/images/noResume.webp";
import "./Styles/MyResumes.css";

//in this page we are storing the details in the local storage in JSON format (key,value) so that after creating Resume we can retrieve them.

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

//mapStateToProps is used for selecting the part of the data from the store that the connected component needs
const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
});

// mapDispatchToProps allows you to specify which actions your component might need to dispatch

const mapDispatchToProps = (dispatch) => ({
  setSelectedTemplateId: (id) => dispatch(selectTemplate(id)),
  setSelectedResumeId: (id) => dispatch(selectResume(id)),
  onAddPersonalInfo: (details) => dispatch(addPersonalInfo(details)),
  setAllExperience: (experiences) => dispatch(addAllExperience(experiences)),
  onAddEducation: (details) => dispatch(addEducation(details)),
  onEditSkill: (skills) => dispatch(editSkill(skills)),
});

// MyResumes page where you can see your saved resume
const MyResumes = (props) => {
  const [resumes, setResumes] = useState([]);

  // Load resumes from local storage
  useEffect(() => {
    const newResumes = window.localStorage.getItem("resumes")
      ? JSON.parse(window.localStorage.getItem("resumes"))
      : [];

    setResumes(newResumes);
  }, []);

  // useNavigate to navigate between pages
  const navigate = useNavigate();

  // Find the template associated with the resume
  const getTemplate = (resume, index) => {
    let template = templates.find(
      (eachTemplate) => eachTemplate.id === resume.template_id
    );

    const TemplateComp = React.cloneElement(template.template, {
      personalinfo: resume.personalInfo,
      workexperience: resume.experiences,
      educationinfo: resume.educationInfo,
      skills: resume.skills,
      key: resume.id,
      index: index,
    });

    return TemplateComp;
  };

  //delete resume
  const deleteResume = (resume) => {
    let resumes = window.localStorage.getItem("resumes");

    let newResumes = JSON.parse(resumes);
    const newSetOfResumes = newResumes.filter((eachResume) => {
      return eachResume.id !== resume.id;
    });

    window.localStorage.setItem("resumes", JSON.stringify(newSetOfResumes));
    setResumes(newSetOfResumes);
  };

  const downloadResume = (id) => {
    const report = new JsPDF("portrait", "pt", "a4");
    report.html(document.getElementById(`${id}report`)).then(() => {
      report.save(`resume.pdf`);
    });
  };

  const setUserData = (resume) => {
    //set personal info
    props.onAddPersonalInfo(resume.personalInfo);

    //set work experience
    props.setAllExperience(resume.experiences);

    //set education info
    props.onAddEducation(resume.educationInfo);

    //set skills
    props.onEditSkill(resume.skills);
  };

  // Navigate to edit template page with resume data
  const navigateToFillDetails = (resume) => {
    props.setSelectedTemplateId(resume.template_id);
    props.setSelectedResumeId(resume.id);
    setUserData(resume);
    navigate("/template/fill-details");
  };

  return (
    <>
      {/* Setting the navbar active link to identify on which tab/page you are at */}
      <Navbar active={"My Resumes"} />
      {/* My resume container */}
      <div className="my-resumes">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            justifyContent="center"
            alignItems="center"
            className="grid"
          >
            {/* rendering saved resume in localStorage usin map method saved in formate of array */}
            {resumes.length >= 1 ? (
              resumes.map((resume, index) => {
                return (
                  <Grid
                    item
                    className={`resume `}
                    id={`${index}resume`}
                    margin={2}
                    key={index}
                  >
                    <Item id={`${index}ITEM`}>
                      {getTemplate(resume, index)}
                      <BlackScreen />
                      {/* Resume template */}
                      <div className="use-template-btn-cont">
                        {/* Download button to download saved resume on hover */}
                        <Button
                          className="use-template-btn"
                          onClick={() => {
                            downloadResume(index);
                          }}
                          size="medium"
                          variant="contained"
                        >
                          Download
                        </Button>
                        {/* Delete button to delete the saved resume in storage on hover  */}
                        <Button
                          className="use-template-btn"
                          onClick={() => {
                            deleteResume(resume);
                          }}
                          size="medium"
                          variant="contained"
                        >
                          Delete
                        </Button>
                        {/* Edit Template button to edite resume saved in local storage on hover */}
                        <Button
                          className="use-template-btn"
                          onClick={() => navigateToFillDetails(resume)}
                          size="medium"
                          variant="contained"
                        >
                          Edit Template
                        </Button>
                      </div>
                    </Item>
                  </Grid>
                );
              })
            ) : (
              // No resume container if no resume found in local storage then it will render this contaier
              <div className="no-resumes-container">
                <Stack p={{ xs: "15px", sm: "25px", md: "40px", lg: "60px " }}>
                  <h2 className="template-header-title">No Resumes Saved</h2>
                  <Stack
                    className="midContainer"
                    direction={{
                      xs: "column-reverse",
                      sm: "column-reverse",
                      md: "column-reverse",
                      lg: "row",
                    }}
                    spacing={{ xs: 1, sm: 2, md: 4 }}
                    mt="20px"
                  >
                    <Typography
                      sx={{
                        fontSize: {
                          xs: "13px",
                          sm: "15px",
                          md: "17px",
                          lg: "19px",
                        },
                        paddingRight: {
                          xs: "15px",
                          sm: "18px",
                          lg: "25px",
                        },
                        textAlign: "justify",
                      }}
                    >
                      It seems like you haven't saved any resumes here yet.
                      Don't worry; we're here to help you get started on
                      creating the perfect resume tailored to your needs. Let's
                      begin crafting your professional story together!
                      {/* Link to create new resume */}
                      <Link to="/">Create Resume</Link>
                    </Typography>
                    <Stack
                      sx={{
                        width: "30%",
                        placeSelf: "center",
                      }}
                    >
                      {/* image to show in my-resume page if no resume found */}
                      <img src={noResume} alt="img" />
                    </Stack>
                  </Stack>
                </Stack>
              </div>
            )}
          </Grid>
        </Box>
      </div>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(MyResumes);
