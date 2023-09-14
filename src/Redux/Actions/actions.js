//types of actions are defined which triggers from the view and change the state/props via store help
//store is  centralization of all the states.

// Action to select a template
export const selectTemplate = (id) => ({
  type: "SELECTTEMPLATE",
  payload: id,
});
// Action to select a resume
export const selectResume = (id) => ({
  type: "SELECTRESUME",
  payload: id,
});

// Action to add personal information
export const addPersonalInfo = (details) => ({
  type: "ADDPERSONALINFO",
  payload: details,
});

// Action to add a new work experience
export const addExperience = (experience) => ({
  type: "ADDEXPERIENCE",
  payload: experience,
});

// Action to add multiple work experiences
export const addAllExperience = (experiences) => ({
  type: "ADDALLEXPERIENCE",
  payload: experiences,
});

// Action to add new skills
export const addNewSkills = () => ({
  type: "ADDNEWSKILLS",
  payload: null,
});

// Action to edit skills
export const editSkill = (skills) => ({
  type: "EDITSKILL",
  payload: skills,
});

// Action to delete a skill by ID
export const deleteSkill = (id) => ({
  type: "DELETESKILL",
  payload: id,
});

// Action to add educational information
export const addEducation = (details) => ({
  type: "ADDEDUCATION",
  payload: details,
});
