import { useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Button,
  useTheme,
  Alert,
  TextField,
  Backdrop,
  CircularProgress,
  Collapse,
  IconButton,
} from "@mui/material";
import loginBanner from "../../assets/loginBanner.jpg";
import { grey } from "@mui/material/colors";
import { useVerifyAccountMutation } from "../../features/services/queries";
import { Close } from "@mui/icons-material";

export const PasswordToken = () => {
  const [token, setToken] = useState("");
  const [message, setMessage] = useState({ type: null, message: null });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyAccount] = useVerifyAccountMutation();

  const theme = useTheme();

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
