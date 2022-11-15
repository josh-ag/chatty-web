import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Avatar,
  InputLabel,
  CircularProgress,
  Alert,
  Tooltip,
  Collapse,
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import { blueGrey, yellow } from "@mui/material/colors";
import { useState } from "react";
import {
  AddAPhotoRounded,
  AlternateEmail,
  Close,
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
import header_image from "../../assets/header_image.jpg";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/reducers/authSlice";

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

  const { firstname, lastname, username, country, phone, bios } = updateForm;
  const [profileImage, setProfileImage] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();

  //use Context
  const { data, isLoading, error } = useGetProfileQuery();
  const [updateProfile] = useUpdateProfileMutation();

  //redirect to login if server return unauthorized statusCode
  if (error && error?.originalStatus === 401) {
    dispatch(logOut());
    return <Navigate to="/login" />;
  }

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

  if (isLoading) {
    return (
      <Box
        sx={{
          height: 300,
          background: blueGrey[50],
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="primary" />
      </Box>
    );
  }

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <Box
      component="form"
      autoComplete="off"
      noValidate={true}
      onSubmit={handleSubmit}
      sx={{
        width: "100%",
      }}
    >
      <Card
        elevation={0}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <CardMedia
          image={header_image}
          sx={{
            width: "100%",
            height: 300,
          }}
        />

        <Paper
          sx={{
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            marginTop: -12,
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#B39CD0",
          }}
          elevation={0}
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
                bgcolor: "#9B89B3",
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
                <AddAPhotoRounded sx={{ color: "#FFC75F" }} />
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
        </Paper>
        <CardContent
          sx={{
            mt: 4,
            width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {message?.message && (
            <Collapse in={open} timeout={500}>
              <Alert
                severity={message?.type}
                sx={{ mb: 2, textTransform: "capitalize" }}
                action={
                  <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    <Close fontSize="inherit" />
                  </IconButton>
                }
              >
                {message?.message}
              </Alert>
            </Collapse>
          )}
          <TextField
            name="firstname"
            placeholder="Firstname"
            label="Firstname"
            defaultValue={data?.user.firstname}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: <PersonRounded sx={{ color: "#B39CD0" }} />,
            }}
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
              endAdornment: <PersonOutlineRounded sx={{ color: "#B39CD0" }} />,
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
            InputProps={{
              endAdornment: <VerifiedUser sx={{ color: "#B39CD0" }} />,
            }}
            fullWidth
          />

          <TextField
            name="email"
            placeholder="Email"
            label="Email"
            defaultValue={data?.user.email}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{ endAdornment: <AlternateEmail color="disabled" /> }}
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
            InputProps={{
              endAdornment: <MapSharp sx={{ color: "#B39CD0" }} />,
            }}
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
              endAdornment: <ContactPhoneOutlined sx={{ color: "#B39CD0" }} />,
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
        </CardContent>
      </Card>
    </Box>
  );
};

export default EditScreen;
