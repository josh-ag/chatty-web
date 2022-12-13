import { useState } from "react";
import {
  Box,
  Grid,
  CardMedia,
  Typography,
  Button,
  IconButton,
  useTheme,
  Alert,
  TextField,
  Stack,
  Backdrop,
  CircularProgress,
  Collapse,
  Card,
  CardContent,
  Avatar,
  Container,
  Paper,
  AppBar,
  Toolbar,
} from "@mui/material";
import styled from "@emotion/styled";
import {
  Visibility,
  VisibilityOff,
  VerifiedUser,
  Person,
  PersonSharp,
  AlternateEmail,
  VpnKey,
  Close,
} from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import { Link as RouterLink, redirect, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useRegisterMutation } from "../../features/services/queries";
import googleIcon from "../../assets/Google.svg";
import linkedinIcon from "../../assets/Linkedin.svg";
import facebookIcon from "../../assets/Facebook.svg";
import arrowLeft from "../../assets/Caret left.svg";
import headerImage from "../../assets/header_image.jpg";

//create toolbar space equivalent
const CustomeBox = styled(Box)(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
}));

const SignupScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState({ type: null, message: null });
  const [open, setOpen] = useState(false);
  const [registerForm, setRegisterForm] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { firstname, lastname, username, email, password } = registerForm;

  //Hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const [register] = useRegisterMutation();

  const handleClickShowPassword = () => {
    setIsVisible(!isVisible);
  };

  //regExp for email validation
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //fires on input changes
  const handleChange = (e) => {
    setRegisterForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //handle registration form
  const handleSubmit = async (e) => {
    //prevent default form behaviour
    e.preventDefault();

    setLoading(true);
    setOpen(false);
    setError(false);
    setMessage((prevState) => ({
      ...prevState,
      type: null,
      message: null,
    }));

    if (!firstname || !lastname || !username || !email || !password) {
      setLoading(false);
      setError(true);
      return;
    }

    if (email && !emailPattern.test(email)) {
      setLoading(false);
      setOpen(true);
      return setMessage({
        ...message,
        type: "error",
        message: "Invalid email address",
      });
    }

    const body = {
      firstname,
      lastname,
      username,
      email,
      password,
    };

    try {
      const { data, error } = await register(body);

      if (error) {
        setOpen(true);
        setLoading(false);
        console.log("Registration Error: ", error);
        return setMessage({
          ...message,
          type: "error",
          message:
            error?.data?.message ||
            error?.error.split(":")[1] ||
            error?.message,
        });
      }

      setOpen(true);
      setLoading(false);
      setMessage((prevState) => ({
        ...prevState,
        type: "success",
        message: data?.message,
      }));

      setTimeout(() => {
        // redirect("/login");
        navigate("/login");
      }, 2000);

      //reset internal state
      setRegisterForm((prevState) => ({
        ...prevState,
        firstname: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
      }));
    } catch (err) {
      console.log("Registration Error: ", err.message);
    }
  };

  return (
    <>
      {loading && (
        <Backdrop
          sx={{
            color: "#fff",
            bgcolor: "primary !important",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={loading}
          onClick={() => setLoading(!loading)}
        >
          <CircularProgress
            sx={{
              position: "fixed",
              left: { xs: "50%", sm: "50%", lg: "70%" },
              top: 25,
            }}
            size={25}
            color="inherit"
          />
        </Backdrop>
      )}

      <Container>
        <AppBar sx={{ bgcolor: "transparent" }} elevation={0} position="static">
          <Toolbar sx={{ bgcolor: "transparent" }}>
            <Button
              size="small"
              variant="outlined"
              onClick={() => navigate(-1)}
              sx={{
                textTransform: "capitalize",
                borderRadius: 20,
              }}
            >
              <Avatar src={arrowLeft} sx={{ width: 24, height: 24 }} />
              Back
            </Button>
          </Toolbar>
        </AppBar>
        <Paper
          sx={() => ({
            display: "flex",
            alignItem: "stretch",
            justifyContent: "center",
            borderRadius: 0,
            pl: 2,
            borderBottomLeftRadius: { sm: 20 },
            borderTopLeftRadius: { sm: 20 },
            boxShadow: "0px 1px 2px  #ddd",
          })}
        >
          <Box
            sx={{
              flex: 1,
              p: 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Card
              elevation={0}
              sx={{
                display: "flex",
                flexDirection: "column",
                borderRadius: theme.spacing(2),
                opacity: 0.9,
              }}
            >
              <CardMedia
                component="img"
                image={headerImage}
                alt="login logo"
                height={200}
                sx={{
                  borderRadius: 0,
                  borderBottomLeftRadius: 100,
                  display: { xs: "block", sm: "none" },
                }}
              />
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h4"
                    mt={1}
                    noWrap
                    sx={{
                      fontWeight: "medium",
                      color: grey[800],
                    }}
                  >
                    Register
                  </Typography>
                  <Typography
                    variant="body1"
                    mb={4}
                    noWrap
                    sx={{
                      color: grey[800],
                    }}
                  >
                    SignUp now
                  </Typography>
                </Box>
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
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                >
                  <TextField
                    error={!firstname && error}
                    variant="outlined"
                    defaultValue={firstname}
                    onChange={handleChange}
                    label="firstname"
                    name="firstname"
                    placeholder="Firstname"
                    helperText="Firstname is required*"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          color={!firstname && error ? "error" : "default"}
                        >
                          <Person fontSize="small" />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                  />

                  <TextField
                    error={!lastname && error}
                    helperText="lastname is required*"
                    defaultValue={lastname}
                    onChange={handleChange}
                    type="text"
                    label="Lastname"
                    name="lastname"
                    placeholder="Lastname"
                    variant="outlined"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          color={!lastname && error ? "error" : "default"}
                        >
                          <PersonSharp fontSize="small" />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                    required
                  />

                  <TextField
                    error={!username && error}
                    name="username"
                    defaultValue={username}
                    onChange={handleChange}
                    label="Username"
                    variant="outlined"
                    placeholder="Username"
                    helperText="Username is required*"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          color={!username && error ? "error" : "default"}
                        >
                          <VerifiedUser fontSize="small" />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                  />

                  <TextField
                    error={!email && error}
                    helperText="Email is required*"
                    defaultValue={email}
                    onChange={handleChange}
                    name="email"
                    variant="outlined"
                    label="Email"
                    placeholder="Email"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          color={!email && error ? "error" : "default"}
                        >
                          <AlternateEmail fontSize="small" />
                        </IconButton>
                      ),
                    }}
                    fullWidth
                  />

                  <TextField
                    error={!password && error}
                    defaultValue={password}
                    onChange={handleChange}
                    type={isVisible ? "text" : "password"}
                    variant="outlined"
                    name="password"
                    label="Password"
                    placeholder="Password"
                    helperText="Password is required*"
                    sx={{ mb: 2 }}
                    InputProps={{
                      startAdornment: (
                        <IconButton
                          color={!password && error ? "error" : "default"}
                        >
                          <VpnKey fontSize="small" />
                        </IconButton>
                      ),
                      endAdornment: (
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                          color="default"
                        >
                          {isVisible ? (
                            <Visibility fontSize="small" />
                          ) : (
                            <VisibilityOff fontSize="small" />
                          )}
                        </IconButton>
                      ),
                    }}
                    autoComplete="true"
                    fullWidth
                  />

                  <Button type="submit" variant="contained" fullWidth>
                    register
                  </Button>
                </Box>

                <Typography
                  variant="caption"
                  sx={{
                    textAlign: "center",
                    pt: 1,
                    color: grey[600],
                  }}
                >
                  By clicking register, you agree to our terms of usage &
                  privacy rules
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mt: 4,
                  }}
                >
                  <Box
                    sx={{
                      bgcolor: "transparent",
                      borderBottom: "1px solid #ccc",
                      flex: 1,
                      flexWrap: "wrap",
                    }}
                  />
                  <Typography
                    sx={{
                      flex: 1,
                      textAlign: "center",
                      color: grey[600],
                    }}
                    variant="body1"
                  >
                    Or continue with
                  </Typography>
                  <Box
                    sx={{
                      bgcolor: "transparent",
                      borderBottom: "1px solid #ccc",
                      flex: 1,
                      flexWrap: "wrap",
                    }}
                  />
                </Box>

                <Stack
                  direction={"row"}
                  spacing={2}
                  sx={{ alignSelf: "center", mt: 2, justifyContent: "center" }}
                >
                  <IconButton sx={{ color: theme.palette.warning.main }}>
                    <Avatar src={googleIcon} sx={{ width: 30, height: 30 }} />
                  </IconButton>
                  <IconButton sx={{ color: theme.palette.primary.main }}>
                    <Avatar src={facebookIcon} sx={{ width: 30, height: 30 }} />
                  </IconButton>
                  <IconButton sx={{ color: theme.palette.primary.light }}>
                    <Avatar src={linkedinIcon} sx={{ width: 30, height: 30 }} />
                  </IconButton>
                </Stack>
                <Stack direction={"row"} sx={{ alignItems: "center", mt: 2 }}>
                  <Typography
                    sx={{
                      textTransform: "capitalize",
                      color: grey[700],
                      textAlign: "center",
                    }}
                    variant="body1"
                  >
                    Already have an acc?
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/login"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    Login
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Box>

          <Box
            sx={{
              borderBottomLeftRadius: 100,
              borderTopLeftRadius: 100,
              flex: { sm: 1, md: 2 },
              backgroundSize: "cover",
              backgroundRepeat: "none",
              backgroundPosition: "center",
              backgroundImage: `url(${loginBanner})`,
            }}
          />
        </Paper>

        <CustomeBox />
      </Container>
    </>
  );
};

export default SignupScreen;
