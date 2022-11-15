import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  useTheme,
  Alert,
  TextField,
  Backdrop,
  CircularProgress,
  Collapse,
} from "@mui/material";
import { AlternateEmail, Close } from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import logoForgotPassword from "../../assets/forgot_passwd.svg";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useResetPasswordMutation } from "../../features/services/queries";

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: null, message: null });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resetPassword] = useResetPasswordMutation();

  const theme = useTheme();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //reset message state
    setLoading(true);
    setOpen(false);
    setMessage((prev) => ({ ...prev, type: null, message: null }));

    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email) {
      setLoading(false);
      setError(true);
      return;
    }

    if (email && !emailPattern.test(email)) {
      setLoading(false);
      setOpen(true);
      return setMessage((prev) => ({
        ...prev,
        type: "error",
        message: "Invalid email",
      }));
    }

    try {
      const { data, error } = await resetPassword({ email });

      if (error) {
        setLoading(false);
        setOpen(true);
        return setMessage((prevState) => ({
          ...prevState,
          type: "error",
          message:
            error?.data?.message ||
            error?.error.split(":")[1] ||
            error?.message,
        }));
      }

      setLoading(false);
      setOpen(true);
      setMessage((prevState) => ({
        ...prevState,
        type: "success",
        message: data?.message,
      }));

      //reset state
      setEmail("");
      if (data?.statusCode === 200 || data?.statusCode === 201) {
        setTimeout(() => navigate("/password/new"), 2000);
      }
    } catch (error) {
      //handle error
    }
  };

  return (
    <>
      {/* LOADER */}
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
              top: "40%",
            }}
            size={25}
            color="inherit"
          />
        </Backdrop>
      )}

      <Box
        sx={{
          width: "100%",
          height: "100vh",
          display: "flex",
          backgroundImage: `url(${loginBanner})`,
          backgroundOrigin: "left",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "none",
        }}
      >
        <Grid
          container
          sx={{ px: 4, justifyContent: "center", alignItems: "center" }}
        >
          <Grid item xs={12} sm={12} md={6}>
            <Paper
              sx={{
                p: 4,
                mt: 6,
                display: "flex",
                flexDirection: "column",
                borderRadius: theme.spacing(2),
                mb: { sm: 4, xs: 4 },
                opacity: 0.9,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  mb: 2,
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "medium",
                    color: grey[800],
                  }}
                  noWrap
                >
                  Reset Password
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  my: 2,
                  color: grey[600],
                }}
              >
                We will send to you email containing instructions to reset your
                password
              </Typography>
              <Box
                component={"form"}
                noValidate={true}
                autoComplete="off"
                onSubmit={handleSubmit}
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
                <TextField
                  onChange={(e) => setEmail(e.target.value)}
                  error={!email && error}
                  type="email"
                  label="Email"
                  placeholder="Email address"
                  defaultValue={email}
                  sx={{ mb: 1 }}
                  helperText="Email is required*"
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
                  fullWidth
                />

                <Button type="submit" variant="contained" fullWidth>
                  Send Instruction
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ForgotPasswordScreen;
