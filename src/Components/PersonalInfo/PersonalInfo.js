import { useForm } from "react-hook-form";
import { Avatar, Button, Divider, Paper, Snackbar } from "@mui/material";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Avatar1 from "react-avatar-edit";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { BackAndNextBtn, InputComponent } from "../../Pages/index";
import MuiAlert from "@mui/material/Alert";
import { addPersonalInfo } from "../../Redux/Actions/actions";
import "./PersonalInfo.css";

// For displaying toast when user do not select profile image
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// mapStateToProps connects the component to the Redux store to access personalInfo data.
const mapStateToProps = (state) => ({
  personalInfo: state.personalInfoReducer.personalInfo,
});
// mapDispatchToProps connects the component to the Redux store to dispatch actions.
const mapDispatchToProps = (dispatch) => ({
  onAddPersonalInfo: (details) => dispatch(addPersonalInfo(details)),
});

// Styled component for the BootstrapDialog title.
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

// Define the PersonalInfo Component.
const PersonalInfo = (props) => {
  const [loading, setLoading] = useState(false);

  //Block the popup notification when no profile image selected
  const [imgSnackbar, setImgSnackbar] = useState(false);

  // useFrom hook for form data and error handeling
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Setting profile image
  const [img, setImg] = useState(
    props.personalInfo.profileImg.length ? props.personalInfo.profileImg : ""
  );
  // eslint-disable-next-line
  const [sotreImage, setSotreImage] = useState([]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleNextBtn = (data) => {
    if (img.length) {
      setLoading(true);
      props.onAddPersonalInfo({ profileImg: img, ...data });

      setTimeout(() => {
        setLoading(false);
        props.setTab(props.tab + 1);
      }, 1);
    } else {
      setImgSnackbar(true);
    }
  };

  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;

    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };

  // Function to handle image cropping.
  const onCrop = (view) => {
    setImg(view);
  };

  // Function to handle image closing.
  const onClose = (view) => {
    setImg(null);
  };

  // Function to save the cropped image.
  const saveImage = () => {
    setSotreImage([{ img }]);
    setOpen(false);
  };

  // Function to handle closing the snackbar notification.
  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setImgSnackbar(false);
  };

  // Function to get the window size.
  const getWindowSize = () => {
    const { innerWidth, innerHeight } = window;

    return { innerWidth, innerHeight };
  };

  const [windowSize, setWindowSize] = useState(getWindowSize());
  // useEffect to handle window resize.
  useEffect(() => {
    function handleWindowResize() {
      setWindowSize(getWindowSize());
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // Render the component's JSX structure.
  return (
    <Paper className="personal-info-paper" elevation={3}>
      <Avatar
        sx={{ width: 120, height: 120, marginBottom: 1 }}
        alt="profile img"
        src={
          img.length ? img : `https://img.icons8.com/color/344/test-account.png`
        }
      />
      <div>
        <Button
          className="change-profile-photo-btn"
          variant="outlined"
          onClick={handleClickOpen}
        >
          Change Profile Photo
        </Button>
        <BootstrapDialog
          onClose={handleClose}
          aria-labelledby="customized-dialog-title"
          open={open}
        >
          <BootstrapDialogTitle
            id="customized-dialog-title"
            onClose={handleClose}
          >
            Update Image
          </BootstrapDialogTitle>
          <DialogContent>
            <Avatar1
              width={windowSize.innerWidth > 900 ? 200 : 150}
              height={windowSize.innerHeight > 500 ? 200 : 50}
              onCrop={onCrop}
              onClose={onClose}
            />
          </DialogContent>
          <DialogActions>
            <Button autoFocus variant="contained" onClick={saveImage}>
              Save
            </Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
      <form onSubmit={handleSubmit(handleNextBtn)}>
        <div className="personal-info-form-fields">
          {/* Input fields for first name, last name, email, mobile ,Address,City,State,Postal Code,Objective */}
          <InputComponent
            title={"First Name"}
            type={"text"}
            name={"firstName"}
            register={register}
            multiline={false}
            value={props.personalInfo.firstName}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                firstName: value,
              })
            }
            error={errors.firstName ? true : false}
            errorMessage={errors.firstName ? errors.firstName.message : null}
          />
          <InputComponent
            title={"Last Name"}
            type={"text"}
            name={"lastName"}
            register={register}
            multiline={false}
            value={props.personalInfo.lastName}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                lastName: value,
              })
            }
            error={errors.lastName ? true : false}
            errorMessage={errors.lastName ? errors.lastName.message : null}
          />
          <InputComponent
            title={"Email"}
            type={"email"}
            name={"email"}
            register={register}
            multiline={false}
            value={props.personalInfo.email}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                email: value,
              })
            }
            error={errors.email ? true : false}
            errorMessage={errors.email ? errors.email.message : null}
          />
          <InputComponent
            title={"Mobile"}
            type={"number"}
            name={"mobile"}
            register={register}
            multiline={false}
            value={props.personalInfo.mobile}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                mobile: value,
              })
            }
            error={errors.mobile ? true : false}
            errorMessage={errors.mobile ? errors.mobile.message : null}
          />
        </div>
        <InputComponent
          title={"Address"}
          type={"text"}
          name={"address"}
          register={register}
          multiline={false}
          value={props.personalInfo.address}
          setValue={(value) =>
            props.onAddPersonalInfo({
              ...props.personalInfo,
              address: value,
            })
          }
          error={errors.address ? true : false}
          errorMessage={errors.address ? errors.address.message : null}
        />
        <div style={{ marginTop: 20 }} className="personal-info-form-fields">
          <InputComponent
            title={"City"}
            type={"text"}
            name={"city"}
            register={register}
            multiline={false}
            value={props.personalInfo.city}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                city: value,
              })
            }
            error={errors.city ? true : false}
            errorMessage={errors.city ? errors.city.message : null}
          />
          <InputComponent
            title={"State"}
            type={"text"}
            name={"State"}
            register={register}
            multiline={false}
            value={props.personalInfo.State}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                State: value,
              })
            }
            error={errors.State ? true : false}
            errorMessage={errors.State ? errors.State.message : null}
          />
          <InputComponent
            title={"Postal Code"}
            type={"number"}
            name={"postalCode"}
            register={register}
            multiline={false}
            value={props.personalInfo.postalCode}
            setValue={(value) =>
              props.onAddPersonalInfo({
                ...props.personalInfo,
                postalCode: value,
              })
            }
            error={errors.postalCode ? true : false}
            errorMessage={errors.postalCode ? errors.postalCode.message : null}
          />
        </div>
        <InputComponent
          title={"Objective"}
          type={"text"}
          name={"objective"}
          register={register}
          multiline={false}
          value={props.personalInfo.objective}
          setValue={(value) =>
            props.onAddPersonalInfo({
              ...props.personalInfo,
              objective: value,
            })
          }
          error={errors.objective ? true : false}
          errorMessage={errors.objective ? errors.objective.message : null}
        />
        <Divider className="personal-details-divider" />
        <BackAndNextBtn
          // onNext={() => handleSubmit(handleNextBtn)}
          loading={loading}
          tab={props.tab}
          nextTitle={"Next"}
          backTitle={"Back"}
        />
      </form>

      {/* Popup notification when no profile image selected */}
      <Snackbar
        open={imgSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
      >
        {/* Popu notification alret message  */}
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          Please select a profile image
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(PersonalInfo);
