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
import loginBanner from "../../assets/loginBanner.jpg";
import { grey } from "@mui/material/colors";
import { useVerifyAccountMutation } from "../../features/services/queries";

export const PasswordToken = () => {
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

    if (!token) {
      setLoading(false);
      return setError(true);
    }

    try {
      const { data, error } = await verifyAccount({ token });

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
        message: data?.message,
      }));

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
                  Verify Token
                </Typography>
              </Box>
              <Box
                component={"form"}
                noValidate={true}
                autoComplete="off"
                onSubmit={handleSubmit}
              >
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
