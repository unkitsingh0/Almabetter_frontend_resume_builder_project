import "./KeySkills.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Paper, Divider, Button } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { connect } from "react-redux";
import { BackAndNextBtn, InputComponent } from "../../Pages/index";
import {
  addNewSkills,
  deleteSkill,
  editSkill,
} from "../../Redux/Actions/actions";

// mapStateToProps and mapDispatchToProps connect the component to the Redux store.
const mapStateToProps = (state) => ({
  skills: state.keySkillsReducer.skills,
});

const mapDispatchToProps = (dispatch) => ({
  onAddNewSkill: () => dispatch(addNewSkills()),
  onEditSkill: (skills) => dispatch(editSkill(skills)),
  onDeleteSkill: (index) => dispatch(deleteSkill(index)),
});

// Define the KeySkills Component function component.
function KeySkills(props) {
  // Define state variables and set initial values.
  const [loading, setLoading] = useState(false);

  // Use React Hook Form to manage form state.
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Handle the preview button click event.
  const handlePreview = (data) => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1);
  };

  // Handle the back button click event.
  const handleBackBtn = () => {
    props.setTab(props.tab - 1);
  };

  // Handle the editing of a skill.
  const onEditSkill = (value, id) => {
    const newSkills = props.skills.map((skill, index) => {
      if (index === id) {
        return value;
      } else return skill;
    });

    props.onEditSkill(newSkills);
  };

  // Render the component's JSX structure.
  return (
    <Paper elevation={3} className="key-skills-paper">
      <h2 className="key-skills-heading">Key Skills</h2>
      <Divider />
      <form onSubmit={handleSubmit(handlePreview)}>
        <div className="key-skills-form-fields">
          {props.skills.map((skill, index) => {
            return (
              <div key={index} className="key-input-with-delete">
                <InputComponent
                  type="text"
                  name={`skill${index + 1}`}
                  register={register}
                  multiline={false}
                  value={skill}
                  setValue={(skill) => onEditSkill(skill, index)}
                  error={errors[`skill${index + 1}`] ? true : false}
                  errorMessage={
                    errors[`skill${index + 1}`]
                      ? errors[`skill${index + 1}`].message
                      : null
                  }
                />
                {props.skills.length === 1 ? null : (
                  <DeleteOutlineOutlinedIcon
                    sx={{ marginLeft: "10px" }}
                    onClick={() => props.onDeleteSkill(index)}
                  />
                )}
              </div>
            );
          })}
        </div>
        {props.skills.length >= 6 ? null : (
          <Button
            className="add-new-btn"
            variant="text"
            onClick={props.onAddNewSkill}
          >
            Add new
          </Button>
        )}
        <Divider className="key-skills-divider" />
        <BackAndNextBtn
          onNext={handlePreview}
          loading={loading}
          tab={props.tab}
          onBack={handleBackBtn}
          nextTitle={"Preview"}
          backTitle={"Back"}
        />
      </form>
    </Paper>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(KeySkills);
