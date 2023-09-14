import { Button, CircularProgress } from "@mui/material";
import React from "react";
import "./BackAndNextBtn.css";

const BackAndNextBtn = (props) => {
  return (
    <div className="back-next-btn-cont">
      {props.tab === 0 ? null : (
        // This will go back one page back in details filling page
        <Button
          onClick={props.onBack}
          className="outlined-btn"
          sx={{ marginRight: "20px" }}
          variant="outlined"
        >
          {props.backTitle}
        </Button>
      )}
      {props.loading ? (
        // Loading animation for next button
        <CircularProgress size={25} />
      ) : (
        // This will go to next page of current page
        <Button type="submit" className="contained-btn" variant="contained">
          {props.nextTitle}
        </Button>
      )}
    </div>
  );
};

export default BackAndNextBtn;
