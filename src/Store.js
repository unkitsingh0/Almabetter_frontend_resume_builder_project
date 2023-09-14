import { createStore } from "redux";

// The `rootReducer` function is a combination of all of the reducers
// in the application. This allows us to have a single store that
// manages the state of the entire application.
import rootReducer from "./Redux/Reducers/combinedReducers";

// The `createStore` function creates a Redux store and takes a reducer
// as its argument. The reducer is responsible for updating the state of
// the application in response to actions.
export const Store = createStore(rootReducer);

//with the help of store every state / activities within the whole project  is centralized & also connect() method is used to connect with redux as we are passing the props.
