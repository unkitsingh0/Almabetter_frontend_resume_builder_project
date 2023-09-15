import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { Store } from "./Store";

// The following code sets up the React-Redux Provider and Redux store to centralize state management.
// React Redux's `Provider` component is used to make the Redux store available to the entire application.
// This allows components to connect to the Redux store and access its data using the `connect` function.

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={Store}>
      <App />
    </Provider>
  </>
);
