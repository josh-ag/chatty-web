import { useState } from "react";
import {
  Box,
  Container,
  Paper,
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
} from "@mui/material";

import {
  Visibility,
  VisibilityOff,
  VerifiedUser,
  Person,
  PersonSharp,
  AlternateEmail,
  LinkedIn,
  Facebook,
  Google,
  VpnKey,
  Close,
} from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import logoSignup from "../../assets/logo_signup.jpg";

import { Link as RouterLink, useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useRegisterMutation } from "../../features/services/queries";

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
    console.log(body);

    try {
      const { data, error } = await register(body);

      if (error) {
        setOpen(true);
        setLoading(false);
        console.log("Registration Error: ", error);
        return setMessage({
          ...message,
          type: "error",
          message: error?.data?.message || error?.error || error?.message,
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

      <Box
        sx={{
          width: "100%",
          height: "100%",
          minHeight: "100vh",
          display: "flex",
          backgroundImage: `url(${loginBanner})`,
          backgroundOrigin: "left",
          backgroundPosition: "top",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          backgroundRepeat: "none",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Container
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: { sm: 4, xs: 4 },
          }}
        >
          <Paper
            sx={{
              width: { sm: "100%", md: "70%" },
              p: 4,
              mt: 6,
              display: "flex",
              flexDirection: "column",
              borderRadius: theme.spacing(2),
              opacity: 0.9,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src={logoSignup}
                style={{
                  width: "auto",
                  height: 200,
                  display: "block",
                  alignSelf: "center",
                }}
                alt="Signup lbanner"
              />
              <Typography
                variant="h5"
                my={4}
                noWrap
                sx={{
                  fontWeight: "medium",
                  color: grey[800],
                }}
              >
                Register
              </Typography>
            </Box>
            <Box
              component="form"
              autoComplete="off"
              onSubmit={handleSubmit}
              noValidate
            >
              {message?.message && (
                <Collapse in={open} timeout={500}>
                  <Alert
                    severity={message.type}
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
                    {message.message}
                  </Alert>
                </Collapse>
              )}
              <Stack direction={"row"} spacing={1}>
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
              </Stack>

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
                    <IconButton color={!email && error ? "error" : "default"}>
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
              sx={{
                textAlign: "center",
                pt: 1,
                color: grey[600],
              }}
            >
              By clicking login, you agree to our terms of usage & privacy rules
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
              sx={{ alignSelf: "center", mt: 2 }}
            >
              <IconButton sx={{ color: theme.palette.warning.main }}>
                <Google />
              </IconButton>
              <IconButton sx={{ color: theme.palette.primary.main }}>
                <Facebook />
              </IconButton>

              <IconButton sx={{ color: theme.palette.primary.light }}>
                <LinkedIn />
              </IconButton>
            </Stack>
            <Stack direction={"row"} sx={{ alignItems: "center", mt: 2 }}>
              <Typography
                sx={{
                  textTransform: "capitalize",
                  color: grey[700],
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
          </Paper>
        </Container>
      </Box>
    </>
  );
};

export default SignupScreen;
