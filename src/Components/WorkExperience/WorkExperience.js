import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button, Divider, MenuItem, Paper, Select } from "@mui/material";
import { connect } from "react-redux";
import { addAllExperience, addExperience } from "../../Redux/Actions/actions";
import {
  BackAndNextBtn,
  SelectComponent,
  InputComponent,
} from "../../Pages/index";
import "./WorkExperience.css";

//mapStateToProps is used for selecting the part of the data from the store that the connected component needs
const mapStateToProps = (state) => ({
  experiences: state.workExperienceReducer.experiences,
});

// mapDispatchToProps allows you to specify which actions your component might need to dispatch
const mapDispatchToProps = (dispatch) => ({
  setExperience: (experience) => dispatch(addExperience(experience)),
  setAllExperience: (experiences) => dispatch(addAllExperience(experiences)),
});

// An array of years that can be selected in the form.
const years = [
  " Present ",
  " 2023 ",
  " 2022 ",
  " 2021 ",
  " 2020 ",
  " 2019 ",
  " 2018 ",
  " 2017 ",
  " 2016 ",
  " 2015 ",
  " 2014 ",
  " 2013 ",
  " 2012 ",
  " 2011 ",
  " 2010 ",
  " 2009 ",
  " 2008 ",
  " 2007 ",
  " 2006 ",
  " 2005 ",
  " 2004 ",
  " 2003 ",
  " 2002 ",
  " 2001 ",
  " 2000 ",
];

// Define a functional component named WorkExperience Component that accepts props as its parameter.
const WorkExperience = (props) => {
  const [loading, setLoading] = useState(false);

  // useFrom hook for handeling form data
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  // Function for going to previous tab
  const handleBackBtn = () => {
    props.setTab(props.tab - 1);
  };
  // Function for going to netx tab
  const handleNextBtn = (data) => {
    setLoading(true);

    let experienceOne = {};
    let experienceTwo = {};

    for (let index in data) {
      // Split form fields into two experiences based on their names (e.g., jobTitle1, organizationName1).
      if (index.includes("1")) {
        experienceOne[index.slice(0, index.length - 1)] = data[index];
      } else {
        experienceTwo[index.slice(0, index.length - 1)] = data[index];
      }
    }

    // If there is data for the second experience, add both experiences to the state.
    if (Object.keys(experienceTwo).length) {
      props.setAllExperience([
        { ...experienceOne, id: 1 },
        { ...experienceTwo, id: 2 },
      ]);
    } else {
      // If there is only data for one experience, add it to the state.
      props.setAllExperience([{ ...experienceOne, id: 1 }]);
    }

    setTimeout(() => {
      setLoading(false);
      props.setTab(props.tab + 1);
    }, 1);
  };

  // Add a new, empty experience to the state when the "Add New" button is clicked.
  const addNewExperience = () => {
    props.setExperience({
      id: props.experiences.length + 1,
      jobTitle: "",
      organizationName: "",
      startYear: "",
      endYear: "",
    });
  };

  // Update the job title for a specific experience.
  const editJobTitleExperience = (value, id) => {
    const newExperiences = props.experiences.map((experience) => {
      if (experience.id === id) {
        return { ...experience, jobTitle: value };
      } else return experience;
    });

    props.setAllExperience(newExperiences);
  };

  // Update the organization name for a specific experience.
  const editOrganisationNameExperience = (value, id) => {
    const newExperiences = props.experiences.map((experience) => {
      if (experience.id === id) {
        return { ...experience, organizationName: value };
      } else return experience;
    });

    props.setAllExperience(newExperiences);
  };

  // Render the component's JSX structure.
  return (
    <Paper className="work-experience-paper" elevation={3}>
      <h2 className="work-experience-heading">Work Experience</h2>
      <form onSubmit={handleSubmit(handleNextBtn)}>
        {props.experiences.map((experience) => {
          return (
            <div key={experience.id} className="experience-cont">
              <h3 className="experience-heading">Experience {experience.id}</h3>
              <Divider sx={{ margin: "5px 0px" }} />
              <div className="experience-form-cont">
                {/* Input field for job title */}
                <InputComponent
                  title={"Job Title"}
                  type={"text"}
                  name={"jobTitle" + experience.id}
                  register={register}
                  multiline={false}
                  value={experience.jobTitle}
                  setValue={(value) =>
                    editJobTitleExperience(value, experience.id)
                  }
                  error={Boolean(errors[`jobTitle${experience.id}`])}
                  errorMessage={
                    errors[`jobTitle${experience.id}`]
                      ? errors[`jobTitle${experience.id}`].message
                      : null
                  }
                />
                {/* Input field for organization name */}
                <InputComponent
                  title={"Organization Name"}
                  type={"text"}
                  name={"organizationName" + experience.id}
                  register={register}
                  multiline={false}
                  value={experience.organizationName}
                  setValue={(value) =>
                    editOrganisationNameExperience(value, experience.id)
                  }
                  error={
                    errors[`organizationName${experience.id}`] ? true : false
                  }
                  errorMessage={
                    errors[`organizationName${experience.id}`]
                      ? errors[`organizationName${experience.id}`].message
                      : null
                  }
                />
                {/* Select field for start year */}
                <SelectComponent
                  title={"Start Year"}
                  errorMessage={
                    errors[`startYear${experience.id}`]
                      ? errors[`startYear${experience.id}`].message
                      : null
                  }
                  error={errors[`startYear${experience.id}`] ? true : false}
                >
                  <Controller
                    render={(props) => {
                      return (
                        <Select
                          value={props.field.value}
                          onChange={props.field.onChange}
                          error={
                            errors
                              ? errors[`startYear${experience.id}`]
                                ? true
                                : false
                              : false
                          }
                        >
                          {years.map((year) => {
                            return (
                              <MenuItem key={year} value={year}>
                                {year}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                    name={`startYear${experience.id}`}
                    control={control}
                    rules={{ required: "*Please select start year" }}
                    defaultValue={experience.startYear}
                  />
                </SelectComponent>
                {/* Select field for end year */}
                <SelectComponent
                  title={"End Year"}
                  errorMessage={
                    errors[`endYear${experience.id}`]
                      ? errors[`endYear${experience.id}`].message
                      : null
                  }
                  error={errors[`endYear${experience.id}`] ? true : false}
                >
                  <Controller
                    render={(props) => (
                      <Select
                        value={props.field.value}
                        onChange={props.field.onChange}
                        error={
                          errors
                            ? errors[`endYear${experience.id}`]
                              ? true
                              : false
                            : false
                        }
                      >
                        {years.map((year) => {
                          return (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    )}
                    name={"endYear" + experience.id}
                    control={control}
                    rules={{ required: "*Please select end year" }}
                    defaultValue={experience.endYear}
                  />
                </SelectComponent>
              </div>
            </div>
          );
        })}
        {/* Add New button */}
        {props.experiences.length === 2 ? null : (
          <div className="add-new-btn-cont">
            <Button onClick={addNewExperience} variant="text">
              Add New
            </Button>
          </div>
        )}
        <Divider sx={{ margin: "10px 0px" }} />
        {/* Back and Next button component */}
        <BackAndNextBtn
          onNext={handleNextBtn}
          onBack={handleBackBtn}
          loading={loading}
          tab={props.tab}
          nextTitle={"Next"}
          backTitle={"Back"}
        />
      </form>
    </Paper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(WorkExperience);
