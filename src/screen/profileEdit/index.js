import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  InputLabel,
  Backdrop,
  CircularProgress,
  Snackbar,
  Alert,
  Grid,
  Tooltip,
} from "@mui/material";
import { grey, yellow } from "@mui/material/colors";
import { useState } from "react";
import {
  AddAPhotoRounded,
  AlternateEmail,
  ContactPhoneOutlined,
  MapSharp,
  PersonOutlineRounded,
  PersonRounded,
  VerifiedUser,
} from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import { Navigate, useParams } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
} from "../../features/services/queries";

const EditScreen = () => {
  //Internal State
  const [updateForm, setUpdateForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    country: "",
    phone: "",
    bios: "",
  });
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState({ type: null, message: null });

  const token = localStorage.getItem("token");
  const loginId = localStorage.getItem("loginId");

  const { firstname, lastname, username, country, phone, bios } = updateForm;
  const [profileImage, setProfileImage] = useState(null);
  const { id } = useParams();

  //use Context
  const { data, isLoading, error } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const handleChange = (e) => {
    setUpdateForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //reset state
    setOpen(false);
    setMessage((prevState) => ({
      ...prevState,
      type: null,
      message: null,
    }));

    if (
      //do nothing if nothing changes
      firstname === data.user.firstname ||
      lastname === data.user.lastname ||
      username === data.user.username ||
      country === data.user.country ||
      phone === data.user.phone ||
      bios === data.user.bios
    ) {
      return;
    }

    const updateData = {
      id,
      body: {
        firstname: firstname || data.user.firstname,
        lastname: lastname || data.user.lastname,
        username: username || data.user.username,
        country: country || data.user.country,
        phone: phone || data.user.phone,
        bios: bios || data.user.bios,
      },
    };

    const { data: updateResp, error: updateError } = await updateProfile(
      updateData
    );

    if (updateError) {
      console.log("Update Error: ", updateError);

      setOpen(true);
      return setMessage((prevState) => ({
        ...prevState,
        type: "error",
        message: updateError.message || error.error,
      }));
    }

    setOpen(true);
    setMessage((prevState) => ({
      ...prevState,
      type: "success",
      message: updateResp.message,
    }));

    //reset internal state
    setUpdateForm((prevState) => ({
      ...prevState,
      firstname: "",
      lastname: "",
      username: "",
      country: "",
      phone: "",
      bios: "",
    }));
  };

  //handle closing snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  if (!token || !loginId) {
    return <Navigate to="/login" />;
  }

  if (isLoading) {
    return (
      <Backdrop open={isLoading}>
        <CircularProgress color="primary" />
      </Backdrop>
    );
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Grid
      container
      sx={{ width: "100%", alignItems: "stretch", p: 1 }}
      spacing={1}
    >
      <Grid item xs={12} sm={12} md={6}>
        {message && (
          <Snackbar
            anchorOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
            sx={{
              textTransform: "uppercase",
            }}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity={message.type}
              sx={{ fontSize: 12 }}
            >
              {message.message}
            </Alert>
          </Snackbar>
        )}

        <Paper sx={{ p: 4, bgcolor: grey[100] }}>
          <Box
            component="form"
            autoComplete="off"
            noValidate={true}
            onSubmit={handleSubmit}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                mb: 6,
              }}
            >
              {profileImage ? (
                <Avatar
                  src={loginBanner.toString()}
                  sx={{ width: 150, height: 150 }}
                />
              ) : (
                <Avatar
                  sx={{
                    width: 150,
                    height: 150,
                    bgcolor: grey[300],
                    color: yellow[400],
                    fontSize: 27,
                  }}
                >
                  {data?.user.username.substr(0, 1).toUpperCase()}
                </Avatar>
              )}
              <Box sx={{ ml: 1, alignSelf: "flex-end" }}>
                <InputLabel htmlFor="Profile">
                  <Tooltip title="Select new profile" placement="right" arrow>
                    <AddAPhotoRounded color="primary" />
                  </Tooltip>
                </InputLabel>
                <TextField
                  name="profile"
                  id="Profile"
                  type="file"
                  onChange={(e) => setProfileImage(e.target.files[0])}
                  sx={{ display: "none" }}
                />
              </Box>
            </Box>
            <Typography variant="h5" sx={{ mb: 4, textAlign: "center" }}>
              Edit Profile
            </Typography>
            <TextField
              name="firstname"
              placeholder="Firstname"
              label="Firstname"
              defaultValue={data?.user.firstname}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{ endAdornment: <PersonRounded color="primary" /> }}
              fullWidth
            />
            <TextField
              name="lastname"
              placeholder="Lastname"
              label="Lastname"
              defaultValue={data?.user.lastname}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{
                endAdornment: <PersonOutlineRounded color="primary" />,
              }}
              fullWidth
            />

            <TextField
              name="username"
              placeholder="username"
              label="Username"
              defaultValue={data?.user.username}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{ endAdornment: <VerifiedUser color="primary" /> }}
              fullWidth
            />

            <TextField
              name="email"
              placeholder="Email"
              label="Email"
              defaultValue={data?.user.email}
              onChange={handleChange}
              sx={{ mb: 2 }}
              InputProps={{ endAdornment: <AlternateEmail color="primary" /> }}
              fullWidth
              disabled
            />

            <TextField
              name="country"
              placeholder="Country"
              label="Country"
              defaultValue={data?.user.country}
              onChange={handleChange}
              sx={{ mb: 2, fontSize: 24 }}
              InputProps={{ endAdornment: <MapSharp color="primary" /> }}
              fullWidth
            />

            <TextField
              name="phone"
              type="number"
              placeholder="Phone Number (e.g +234)"
              label="Phone Number"
              defaultValue={data?.user.phone}
              onChange={handleChange}
              InputProps={{
                endAdornment: <ContactPhoneOutlined color="primary" />,
              }}
              fullWidth
              sx={{ mb: 2 }}
            />

            <TextField
              onChange={handleChange}
              defaultValue={data?.user.bios}
              multiline
              rows={6}
              name="bios"
              placeholder="Bio"
              fullWidth
            />
            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 2 }}
              type="submit"
              disabled={
                firstname || lastname || username || country || phone || bios
                  ? false
                  : true
              }
            >
              update
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default EditScreen;
