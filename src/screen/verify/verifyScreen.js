import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { AlternateEmail } from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import { grey } from "@mui/material/colors";
import { useVerifyAccountMutation } from "../../features/services/queries";

export const VerifyScreen = () => {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [message, setMessage] = useState({ type: null, message: null });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyAccount] = useVerifyAccountMutation();

  const theme = useTheme();

  //handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //reset message state
    setOpen(false);
    setMessage((prev) => ({ ...prev, type: null, message: null }));
    setLoading(true);

    const emailPattern =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!email || !token) {
      setLoading(false);
      return setError(true);
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
      const { data, error } = await verifyAccount({ email, token });

      if (error) {
        setOpen(true);
        setLoading(false);
        return setMessage((prevState) => ({
          ...prevState,
          type: "error",
          message: error?.data.message || error?.error,
        }));
      }

      setLoading(false);
      setOpen(true);
      setMessage((prevState) => ({
        ...prevState,
        type: "success",
        message: data.message,
      }));

      //reset state
      setEmail("");
      setToken("");
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

      {/* MESSAGES */}
      {message && (
        <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          sx={{ textTransform: "uppercase" }}
        >
          <Alert
            variant="filled"
            onClose={handleClose}
            severity={message?.type}
            // sx={{ fontSize: 12 }}
          >
            {message?.message}
          </Alert>
        </Snackbar>
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
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "medium",
                    color: grey[800],
                    mb: 4,
                  }}
                  noWrap
                >
                  Email Verification
                </Typography>
              </Box>
              <Box
                component={"form"}
                noValidate={true}
                autoComplete="off"
                onSubmit={handleSubmit}
              >
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

                <TextField
                  onChange={(e) => setToken(e.target.value)}
                  error={!token && error}
                  type="text"
                  label="Token"
                  placeholder="verification token"
                  defaultValue={token}
                  sx={{ mb: 1 }}
                  helperText="Token is required*"
                  fullWidth
                />

                <Button type="submit" variant="contained" fullWidth>
                  Submit
                </Button>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
