import { useState } from "react";
import {
  Box,
  Container,
  Paper,
  Typography,
  Button,
  IconButton,
  useTheme,
  Collapse,
  Alert,
  TextField,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import { VpnKey, Visibility, VisibilityOff, Close } from "@mui/icons-material";
import loginBanner from "../../assets/loginBanner.jpg";
import { grey } from "@mui/material/colors";
import { useSetNewPasswordMutation } from "../../features/services/queries";

const NewPassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState({ type: null, message: null });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [setNewPassword] = useSetNewPasswordMutation();

  const theme = useTheme();

  const handleClickShowPassword = () => {
    setIsVisible((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //reset message/open state
    setLoading(true);
    setOpen(false);
    setError(false);
    setMessage({ type: null, message: null });

    if (!resetCode || !password || !confirm) {
      setLoading(false);
      setError(true);
      return;
    }

    if (password !== confirm) {
      setLoading(false);
      setOpen(true);
      setMessage((prev) => ({
        ...prev,
        type: "error",
        message: "Confirmation password do not match",
      }));
      return;
    }
    const { data, error } = await setNewPassword({ resetCode, password });
    if (error) {
      setLoading(false);
      setOpen(true);
      setMessage((prevState) => ({
        ...prevState,
        type: "error",
        message: error?.data?.message || error?.error.split(":")[1],
      }));
      return;
    }

    if (data) {
      setLoading(false);
      setOpen(true);
      setMessage({ type: "success", message: data?.message });
    }

    // resetState
    setPassword("");
    setConfirm("");
    setResetCode("");
  };

  return (
    <>
      {loading && (
        <Backdrop
          open={loading || false}
          sx={(theme) => ({ zIndex: theme.zIndex.appBar + 1 })}
        >
          <CircularProgress color="primary" />
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
              px: 4,
              py: 6,
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

            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                error={!resetCode && error}
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                helperText="Enter Reset Code*"
                type={"text"}
                variant="outlined"
                name="resetCode"
                label="Reset Code"
                placeholder="Reset Code"
                sx={{ mb: 2 }}
                fullWidth
                autoComplete="true"
              />
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
                    <IconButton
                      color={!password && error ? "error" : "default"}
                    >
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
        </Container>
      </Box>
    </>
  );
};

export default NewPassword;
