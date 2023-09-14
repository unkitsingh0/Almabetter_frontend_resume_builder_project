//Initial values declared  to the reducer
const initialSelectedTemplateState = {
  selectedTemplateId: null,
  selectedResumeId: null,
};

// Initial state for personal information state
const initialPersonalInfoState = {
  personalInfo: {
    profileImg: "",
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    State: "",
    postalCode: "",
    objective: "",
  },
};
// Inintial state for work experience state
const initialWorkExperienceState = {
  experiences: [
    {
      id: 1,
      jobTitle: "",
      organizationName: "",
      startYear: "",
      endYear: "",
    },
  ],
};

// Initial state for education state
const initialEducationState = {
  educationInfo: {
    domain: "",
    university: "",
    degree: "",
    startYear: "",
    endYear: "",
  },
};

// Initial state for skills state
const initialSkillsState = {
  skills: ["", "", ""],
};

// once action is dispatched from view reducer is triggered with the action to change state

// Each reducer handles a specific part of the state and defines how it should change in response to actions
// Reducer for selected template and resume
export const selectedTemplateReducer = (
  state = initialSelectedTemplateState,
  action
) => {
  switch (action.type) {
    case "SELECTTEMPLATE":
      return { ...state, selectedTemplateId: action.payload };
    case "SELECTRESUME":
      return { ...state, selectedResumeId: action.payload };
    default:
      return state;
  }
};

// Reducer for personal information
export const personalInfoReducer = (
  state = initialPersonalInfoState,
  action
) => {
  switch (action.type) {
    case "ADDPERSONALINFO":
      return {
        ...state,
        personalInfo: { ...state.personalInfo, ...action.payload },
      };
    default:
      return state;
  }
};

// Reducer for work experience
export const workExperienceReducer = (
  state = initialWorkExperienceState,
  action
) => {
  switch (action.type) {
    case "ADDEXPERIENCE":
      return {
        ...state,
        experiences: [...state.experiences, action.payload],
      };
    case "ADDALLEXPERIENCE":
      return {
        ...state,
        experiences: action.payload,
      };
    default:
      return state;
  }
};

// Reducer for key skills
export const keySkillsReducer = (state = initialSkillsState, action) => {
  switch (action.type) {
    case "ADDNEWSKILLS":
      return { ...state, skills: [...state.skills, ""] };
    case "EDITSKILL": {
      return {
        ...state,
        skills: action.payload,
      };
    }
    case "DELETESKILL": {
      const newSkills = state.skills.filter(
        (skill, id) => id !== action.payload
      );

      return { ...state, skills: newSkills };
    }
    default:
      return state;
  }
};

// Reducer for education details
export const educationDetailsReducer = (
  state = initialEducationState,
  action
) => {
  switch (action.type) {
    case "ADDEDUCATION":
      return { ...state, educationInfo: action.payload };
    default:
      return state;
  }
};
