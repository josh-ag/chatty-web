import { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Button,
  IconButton,
  useTheme,
  Alert,
  TextField,
  Stack,
  CircularProgress,
  Backdrop,
  Collapse,
  Card,
  CardContent,
  CardMedia,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  AlternateEmail,
  LinkedIn,
  Facebook,
  Google,
  VpnKey,
  Close,
} from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import chat_image from "../../assets/chat.jpg";
import { grey } from "@mui/material/colors";
import { useSigninMutation } from "../../features/services/queries";
import styled from "@emotion/styled";
import { useDispatch } from "react-redux";
import { Authenticate } from "../../features/reducers/authSlice";

//create toolbar space equivalent
const CustomeBox = styled(Box)(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
}));

const LoginScreen = () => {
  //Internavl state
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState({ type: null, message: null });
  const [open, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(false);
  const { email, password } = loginForm;

  //validate email
  const emailPattern =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  //Hooks
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signin] = useSigninMutation();

  const handleClickShowPassword = () => {
    setIsVisible(!isVisible);
  };

  //fire on input change
  const handleChange = (e) => {
    setLoginForm((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    //prevent default form behaviour
    e.preventDefault();

    setOpen(false);
    setError(false);
    setMessage({ ...message });
    setLoading(true);

    if (!email || !password) {
      setLoading(false);
      return setError(true);
    }

    if (email && !emailPattern.test(email)) {
      setLoading(false);
      setOpen(true);
      return setMessage((prev) => ({
        ...prev,
        type: "error",
        message: "Invalid email address",
      }));
    }

    if (!password) {
      setLoading(false);
      setOpen(true);
      return setMessage((prev) => ({
        ...prev,
        type: "error",
        message: "Password field is empty",
      }));
    }

    const body = { email, password };

    try {
      const { data, error } = await signin(body);

      if (error) {
        console.log("Login Error: ", error);
        setLoading(false);
        setOpen(true);
        return setMessage((prev) => ({
          ...prev,
          type: "error",
          message:
            error.data?.message || error?.error.split(":")[1] || error?.message,
        }));
      }

      localStorage.setItem("__chatty_token__", data.token);
      dispatch(Authenticate());

      setOpen(true);
      setMessage((prev) => ({
        ...prev,
        type: "success",
        message: data?.message,
      }));

      setTimeout(() => {
        navigate(`/`);
      }, 2000);
    } catch (err) {
      //handle other error
    }
  };

  return (
    <>
      {isLoading && (
        <Backdrop
          open={isLoading || false}
          sx={(theme) => ({ zIndex: theme.zIndex.appBar + 1 })}
        >
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <Grid
        container
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100vh",
          display: "flex",
          backgroundImage: `url(${loginBanner})`,
          backgroundAttachment: "fixed",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "none",
        }}
      >
        <Grid
          item
          xs={11}
          sm={10}
          md={6}
          p={2}
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <CustomeBox />
          <Card
            sx={{
              width: { sm: "100%", md: "70%" },
              display: "flex",
              flexDirection: "column",
              borderRadius: theme.spacing(2),
              opacity: 0.9,
            }}
          >
            <CardMedia
              component="img"
              image={chat_image}
              alt="login logo"
              height={200}
            />

            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  mb: 2,
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
                  Login
                </Typography>
                <Typography
                  variant="body1"
                  mb={2}
                  noWrap
                  sx={{
                    color: grey[800],
                  }}
                >
                  SignIn to continue
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
                  name="email"
                  onChange={handleChange}
                  error={!email && error}
                  helperText="Email field is required*"
                  inputMode="email"
                  label="Email"
                  variant="outlined"
                  placeholder="Email"
                  sx={{ mb: 2 }}
                  defaultValue={email}
                  InputProps={{
                    startAdornment: (
                      <IconButton
                        edge="start"
                        color={!email && error ? "error" : "default"}
                      >
                        <AlternateEmail fontSize="small" />
                      </IconButton>
                    ),
                  }}
                  required
                  fullWidth
                />

                <TextField
                  name="password"
                  error={!password && error}
                  helperText="Password field is required*"
                  type={isVisible ? "text" : "password"}
                  variant="outlined"
                  label="Password"
                  placeholder="Password"
                  value={password}
                  onChange={handleChange}
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
                        sx={{ color: grey[600] }}
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
                  required
                />
                <Button type="submit" variant="contained" fullWidth>
                  Login
                </Button>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button
                  component={RouterLink}
                  to="/password/forgot"
                  sx={{
                    alignSelf: "flex-start",
                    textTransform: "capitalize",
                  }}
                >
                  Forgot password
                </Button>
                <Stack
                  direction={"row"}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography
                    sx={{
                      color: grey[700],
                      textTransform: "capitalize",
                    }}
                    noWrap
                  >
                    Don't have acc?
                  </Typography>
                  <Button
                    component={RouterLink}
                    to="/signup"
                    sx={{
                      textTransform: "capitalize",
                    }}
                  >
                    SignUp
                  </Button>
                </Stack>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Box
                  sx={{
                    bgcolor: "transparent",
                    borderBottom: "1px solid #ccc",
                    flex: 1,
                  }}
                />
                <Typography
                  sx={{
                    flex: 1,
                    textAlign: "center",
                    color: grey[700],
                  }}
                >
                  Or continue with
                </Typography>
                <Box
                  sx={{
                    bgcolor: "transparent",
                    borderBottom: "1px solid #ccc",
                    flex: 1,
                  }}
                />
              </Box>

              <Stack
                direction={"row"}
                spacing={2}
                sx={{ alignSelf: "center", mt: 2, justifyContent: "center" }}
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
            </CardContent>
          </Card>
          <CustomeBox />
        </Grid>
      </Grid>
    </>
  );
};

export default LoginScreen;
