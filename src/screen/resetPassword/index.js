import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  IconButton,
  useTheme,
  Snackbar,
  Alert,
  TextField,
} from "@mui/material";
import { VpnKey, Visibility, VisibilityOff } from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import { grey } from "@mui/material/colors";

const ResetPasswordScreen = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState({ type: null, message: null });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const theme = useTheme();

  const handleClickShowPassword = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //reset message/open state
    setOpen(false);
    setError(false);
    setMessage({ type: null, message: null });

    if (!password || !confirm) {
      setError(true);
      return;
    }

    if (password !== confirm) {
      setOpen(true);
      setMessage((prev) => ({
        ...prev,
        type: "error",
        message: "password do not match",
      }));
      return;
    }

    setOpen(true);
    setMessage({ type: "success", message: "New password set" });
  };

  //handle close snackbar
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
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
      <Container
        sx={{
          flex: 1,
          display: "flex",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: { sm: "100%", md: "70%", xl: "80%" },
            p: 4,
            mt: 6,
            display: "flex",
            flexDirection: "column",
            borderRadius: theme.spacing(2),
            mb: { sm: 4, xs: 4 },
            opacity: 0.9,
          }}
        >
          <Typography
            variant="h5"
            my={4}
            textAlign="center"
            sx={{
              fontWeight: "medium",
              color: grey[800],
            }}
          >
            Create New Password
          </Typography>

          <form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <TextField
              error={!password && error}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              helperText="Enter New Password*"
              type={isVisible ? "text" : "password"}
              variant="outlined"
              name="password"
              label="Password"
              placeholder="New Password"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <IconButton color={!password && error ? "error" : "default"}>
                    <VpnKey />
                  </IconButton>
                ),
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    sx={{ color: "default" }}
                  >
                    {isVisible ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                ),
              }}
              fullWidth
              autoComplete="true"
            />

            <TextField
              error={!confirm && error}
              helperText="Confirmation password*"
              defaultValue={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              type={isVisible ? "text" : "password"}
              variant="outlined"
              label="Confirmation password"
              placeholder="Confirm Password"
              sx={{ mb: 2 }}
              InputProps={{
                startAdornment: (
                  <IconButton color={!confirm && error ? "error" : "default"}>
                    <VpnKey />
                  </IconButton>
                ),
              }}
              fullWidth
              autoComplete="true"
            />

            <Button variant="contained" type="sumbit" fullWidth>
              Submit
            </Button>
          </form>
        </Paper>

        {message && (
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={open}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              variant="filled"
              onClose={handleClose}
              severity={message.type}
              sx={{
                fontSize: 13,
                textTransform: "uppercase",
              }}
            >
              {message.message}
            </Alert>
          </Snackbar>
        )}
      </Container>
    </Box>
  );
};

export default ResetPasswordScreen;
