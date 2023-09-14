// Import all reducers with their methods
import {
  selectedTemplateReducer,
  personalInfoReducer,
  workExperienceReducer,
  keySkillsReducer,
  educationDetailsReducer,
} from "./reducers";

// Import combineReducers from Redux
import { combineReducers } from "redux";

// Combine all reducers into a root reducer
const rootReducer = combineReducers({
  // Here, you specify how the state managed by each reducer is organized in your Redux store
  // Each property represents a slice of state managed by the corresponding reducer
  selectedTemplateReducer, // Manages the selected template ID
  personalInfoReducer, // Manages personal information
  workExperienceReducer, // Manages work experience data
  keySkillsReducer, // Manages key skills data
  educationDetailsReducer, // Manages education details data
});

export default rootReducer;
