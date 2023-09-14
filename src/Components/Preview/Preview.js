import React, { useEffect, useState } from "react";
import { Button, CircularProgress, Container, TextField } from "@mui/material";
import JsPDF from "jspdf";
import uniqid from "uniqid";
import { connect } from "react-redux";
import { templates } from "../../Utils/Data/templates";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Alert from "@mui/material/Alert";
import { ReceiptOutlined } from "@mui/icons-material";
import "../Preview/Preview.css";

// mapStateToProps connects the component to the Redux store to access data.
const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
  selectedResumeId: state.selectedTemplateReducer.selectedResumeId,
  personalInfo: state.personalInfoReducer.personalInfo,
  experiences: state.workExperienceReducer.experiences,
  educationInfo: state.educationDetailsReducer.educationInfo,
  skills: state.keySkillsReducer.skills,
});

// Define the component style.
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "4px",
  boxShadow: 24,
  p: 4,
};

// mapDispatchToProps connects the component to the Redux store to dispatch actions.
const mapDispatchToProps = (dispatch) => ({});

const Preview = (props) => {
  const [loading, setLoading] = useState(false);
  const [resumeName, setResumeName] = useState("");
  const [redirectAlert, setRedirectAlert] = useState(false);
  const [redirectCounter, setRedirectCounter] = useState(8);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    // When user clike anywhere in the screen it will redirect to home page
    window.location.reload();
  };

  // Function to get the selected template component.
  const getTemplate = (template, index) => {
    if (template.id === props.selectedTemplateId) {
      // cloneElement lets you create a new React element using another element as a starting point.
      const TemplateComp = React.cloneElement(template.template, {
        personalinfo: props.personalInfo,
        workexperience: props.experiences,
        educationinfo: props.educationInfo,
        skills: props.skills,
        index: index,
      });
      return TemplateComp;
    }
  };

  // Function to handle saving the resume.
  const handleSave = () => {
    if (resumeName.length === 0) {
      setError("*Please fill this field");
    } else {
      setError("");
      setLoading(true);
      const report = new JsPDF("portrait", "pt", "a4");
      report
        .html(document.getElementById(`${props.selectedTemplateId - 1}report`))
        .then(() => {
          report.save(`${resumeName}.pdf`);
          setLoading(false);
          //Saving the user data in localstorage
          let resumes = window.localStorage.getItem("resumes");

          if (resumes) {
            let newResumes = JSON.parse(resumes);

            let resumeFound = newResumes.find(
              (resume) => resume.id === props.selectedResumeId
            );

            if (resumeFound) {
              const allNewResumes = newResumes.map((resume) => {
                if (resume.id === props.selectedResumeId) {
                  return {
                    template_id: props.selectedTemplateId,
                    id: props.selectedResumeId,
                    personalInfo: props.personalInfo,
                    experiences: props.experiences,
                    educationInfo: props.educationInfo,
                    skills: props.skills,
                  };
                } else return resume;
              });

              window.localStorage.setItem(
                "resumes",
                JSON.stringify(allNewResumes)
              );

              window.location.reload();

              return;
            }

            newResumes.push({
              template_id: props.selectedTemplateId,
              id: uniqid(),
              personalInfo: props.personalInfo,
              experiences: props.experiences,
              educationInfo: props.educationInfo,
              skills: props.skills,
            });

            window.localStorage.setItem("resumes", JSON.stringify(newResumes));
          } else {
            window.localStorage.setItem(
              "resumes",
              JSON.stringify([
                {
                  template_id: props.selectedTemplateId,
                  id: uniqid(),
                  personalInfo: props.personalInfo,
                  experiences: props.experiences,
                  educationInfo: props.educationInfo,
                  skills: props.skills,
                },
              ])
            );
          }

          // handelOpen function will show modal of message for user that Resume has been sucsessfully saved
          handleOpen();

          // This will display Redirect coundown for redirecting to home page after saving resume
          setRedirectAlert(true);

          // Redirect user to the myResumes page after 8 sec of saving resume
          setTimeout(() => {
            setRedirectAlert(false);
            window.location.reload();
          }, 8000);
        })
        // If there is any error
        .catch((error) => console.log(error.message));
    }
  };
  // Function to handle going back to the previous tab.
  const handleBackBtn = () => {
    props.setTab(props.tab - 1);
  };

  // useEffect to start coundown for redirecting to home page after user saves resume
  useEffect(() => {
    if (redirectAlert) {
      // This timer will reduce time with 1 sec to diplay in the screen
      const timer = setInterval(() => {
        setRedirectCounter((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (ReceiptOutlined === 0) {
        clearInterval(timer);
      }

      return () => {
        clearInterval(timer); // Clean up the timer on unmount
      };
    }
  }, [redirectCounter, redirectAlert]);
  return (
    <Container
      sx={{
        padding: {
          xs: "40px 20px",
          md: "60px 80px",
        },
      }}
      className="preview-container"
    >
      {/* To show coundown to user time ramaining to redirect to home page after saving resume */}
      {redirectAlert ? (
        <Alert severity="info">{`Redirecting to the home page in ${redirectCounter} seconds or Click anywhere to go home`}</Alert>
      ) : null}
      {/* Page heading */}
      <h2 className="preview-header-title">Resume Preview</h2>
      <div className="resume-preview-grid-container">
        {/* preview container */}
        <div className="resume-preview-grid-item" id="previewresume">
          {templates.map((template, index) => {
            return getTemplate(template, index);
          })}
        </div>

        <div className="resume-preview-grid-item">
          <div className="resume-save-container">
            <h3 className="resume-save-title">Create File Name</h3>
            {/* Input filed to add name for saving or downloading the resume */}
            <TextField
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="resume-name-field"
              sx={{ width: "70%" }}
              id="outlined-basic"
              variant="outlined"
              error={error.length > 0 ? true : false}
              helperText={error}
            />
            <div className="resume-back-next-container">
              {/* Button to download or save resume after click */}
              <Button
                onClick={handleBackBtn}
                className="outlined-btn"
                sx={{ marginRight: "20px" }}
                variant="outlined"
              >
                Back
              </Button>
              {loading ? (
                <CircularProgress size={25} />
              ) : (
                <Button
                  onClick={handleSave}
                  className="contained-btn"
                  variant="contained"
                >
                  Save
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
      {/* Modal to show that resume has been successfully saved to user local system  */}
      <div className="modal">
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h5" align="center">
              <CheckCircleIcon sx={{ color: "blue", fontSize: "60px" }} />
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              Your Resume has been Sucsessfully Saved.
            </Typography>
          </Box>
        </Modal>
      </div>
    </Container>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Preview);
