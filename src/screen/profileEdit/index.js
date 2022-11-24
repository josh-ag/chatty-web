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
  Stack,
  useTheme,
} from "@mui/material";
import { blueGrey } from "@mui/material/colors";
import { useState } from "react";
import {
  AlternateEmail,
  Close,
  ContactPhoneOutlined,
  MapSharp,
  PersonOutlineRounded,
  PersonRounded,
  VerifiedUser,
} from "@mui/icons-material";
import { Navigate, useParams } from "react-router-dom";
import {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useUploadProfilePictureMutation,
} from "../../features/services/queries";
import header_image from "../../assets/header_image.jpg";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/reducers/authSlice";
import userIcon from "../../assets/user.svg";
import cameraIcon from "../../assets/Camera.svg";

const EditScreen = () => {
  /*
=======================================
    INTERNAL STATE
=======================================
  */
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
  const [loading, setLoading] = useState(false);
  const { firstname, lastname, username, country, phone, bios } = updateForm;
  const [profileImage, setProfileImage] = useState(null);
  const { id } = useParams();
  const dispatch = useDispatch();
  const theme = useTheme();

  //USE REDUCER HOOKS
  const loginId = localStorage.getItem("c_id");
  const { data, isLoading, error } = useGetProfileQuery(loginId);
  const [updateProfile] = useUpdateProfileMutation();
  const [uploadProfilePicture] = useUploadProfilePictureMutation();

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

  /*
==================================
      UPDATE USER INFO FUNC
==================================
 */
  const handleUpdate = async (e) => {
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

    const { data: updateRes, error: updateError } = await updateProfile(
      updateData
    );

    if (updateError) {
      console.log("Update Error: ", updateError);

      setOpen(true);
      setMessage((prevState) => ({
        ...prevState,
        type: "error",
        message: updateError.message || error.error,
      }));
      return;
    }

    setOpen(true);
    setMessage((prevState) => ({
      ...prevState,
      type: "success",
      message: updateRes.message,
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

  //CALLED WHEN USER SELECT NEW PROFILE PICTURE
  const handleFilechange = (file) => {
    //reset state
    setOpen(false);
    setMessage((prevState) => ({
      ...prevState,
      type: null,
      message: null,
    }));

    const mimeType = /^image\/jpg|image\/jpeg|image\/png$/;

    if (!mimeType.test(file.type)) {
      setOpen(true);
      setMessage((prevState) => ({
        ...prevState,
        type: "error",
        message: "File must be of type jpg|jpeg|png",
      }));
      return;
    }

    setProfileImage(file);
  };

  //HANDLE UPLOADING FILE
  const handleProfileUpload = () => {
    //reset state
    setLoading(true);
    setOpen(false);
    setMessage((prevState) => ({
      ...prevState,
      type: null,
      message: null,
    }));

    if (!profileImage) return;

    const FR = new FileReader();
    let baseString;
    FR.onloadend = async () => {
      baseString = FR.result;
      const avatar = { uploads: FR.result };
      const { data, error } = await uploadProfilePicture(avatar);
      if (error) {
        setProfileImage(null);
        setLoading(false);
        console.log("Upload Error: ", error);
        setOpen(true);
        setMessage((prevState) => ({
          ...prevState,
          type: "error",
          message: error?.message || error?.error.split(":")[1],
        }));
        return;
      }

      setLoading(false);
      setOpen(true);
      setMessage((prevState) => ({
        ...prevState,
        type: "success",
        message: data?.message,
      }));
      setProfileImage(null);
      window.location.reload();
    };

    FR.readAsDataURL(profileImage);
    setProfileImage("");
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

  console.log(error);
  if (error) {
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
        <Typography>{error?.message || error?.error}</Typography>
      </Box>
    );
  }

  return (
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
        <Avatar
          src={data?.user?.profilePicture?.url || userIcon}
          sx={{ width: 150, height: 150 }}
        />

        <Stack
          direction={"column"}
          sx={{
            alignSelf: "flex-end",
            alignItems: "center",
            width: "auto",
            overflow: "hidden",
          }}
          spacing={1}
        >
          <InputLabel htmlFor="Profile">
            <Tooltip title="Select new profile" placement="right" arrow>
              <Avatar
                src={cameraIcon}
                sx={{ bgcolor: "#FFC75F", width: 27, height: 27 }}
              />
            </Tooltip>
          </InputLabel>
          <TextField
            name="profile"
            id="Profile"
            type="file"
            onChange={(e) => handleFilechange(e.target.files[0])}
            sx={{ display: "none" }}
          />

          {loading && (
            <CircularProgress
              sx={{ color: theme.palette.primary.light }}
              size={20}
            />
          )}

          {profileImage && (
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              size="small"
              sx={{ textTransform: "capitalize" }}
              onClick={handleProfileUpload}
            >
              save
            </Button>
          )}
        </Stack>
      </Paper>
      <CardContent
        sx={{
          mt: 4,
          width: { xs: "95%", sm: "80%", md: "70%", lg: "60%" },
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          px: 6,
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
        <Box
          component="form"
          autoComplete="off"
          noValidate={true}
          onSubmit={handleUpdate}
          sx={{
            width: "100%",
          }}
        >
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
        </Box>
      </CardContent>
    </Card>
  );
};

export default EditScreen;
