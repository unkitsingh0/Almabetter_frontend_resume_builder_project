import "./Styles/Home.css";
import { Box, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Navbar, BlackScreen } from ".";
import { templates } from "../Utils/Data/templates";
import { selectTemplate } from "../Redux/Actions/actions";

// mapStateToProps is used for selecting the part of the data from the store that the connected component needs
const mapStateToProps = (state) => ({
  selectedTemplateId: state.selectedTemplateReducer.selectedTemplateId,
});

// mapDispatchToProps allows you to specify which actions your component might need to dispatch
const mapDispatchToProps = (dispatch) => ({
  setSelectedTemplateId: (id) => dispatch(selectTemplate(id)),
});

// Home component
const Home = (props) => {
  // UseNavigate to navigate to different pages automatically
  const navigate = useNavigate();

  // Function for selecting a Template and navigating to the details filling page
  const navigateToFillDetails = (id) => {
    props.setSelectedTemplateId(id);
    navigate("/template/fill-details");
  };

  return (
    <>
      {/* Setting the navbar active link to identify on which tab/page you are at */}
      <Navbar active={"Resume Templates"} />

      <>
        {/* Home container */}
        <div className="home">
          <div className="home-templates-cont">
            {/* Home page headding */}
            <h2 className="template-header-title">Templates</h2>

            <p className="template-select-text">
              Select a template to get started
            </p>

            <Stack
              sx={{
                width: "100%",
                display: "grid",
                gridTemplateColumns: {
                  sm: "1fr 1fr",
                  md: "1fr 1fr",
                  lg: "1fr 1fr 1fr",
                  xl: "1fr 1fr 1fr 1fr",
                },
                gridGap: "30px",
              }}
            >
              {/* Map function ro render templates stored in templates array */}
              {templates.map((template) => {
                return (
                  // Template container
                  <Box
                    key={template.id}
                    id="template"
                    className="templates-img-cont"
                  >
                    {/* Template image */}
                    <img
                      style={{ width: "75%" }}
                      className="template-img"
                      src={template.template_img}
                      alt={template.template_name}
                    />
                    <BlackScreen />
                    {/* Use Template button visible on hover */}
                    <Button
                      className="use-template-btn"
                      onClick={() => navigateToFillDetails(template.id)}
                      size="medium"
                      variant="contained"
                    >
                      Use Template
                    </Button>
                  </Box>
                );
              })}
            </Stack>
          </div>
        </div>
      </>
    </>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
