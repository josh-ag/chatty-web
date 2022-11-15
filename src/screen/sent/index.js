import {
  Box,
  Container,
  Paper,
  Button,
  useTheme,
  Typography,
} from "@mui/material";
import successLogo from "../../assets/success.svg";
import loginBanner from "../../assets/loginBanner.jpg";
import { Link as RouterLink } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { KeyboardArrowLeft } from "@mui/icons-material";

const SuccessConfirmation = () => {
  const theme = useTheme();

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
          flexDirection: "column",
        }}
      >
        <Paper
          sx={{
            width: { sm: "100%", md: "70%", xl: "80%" },
            p: 4,
            display: "flex",
            flexDirection: "column",
            borderRadius: theme.spacing(2),
            opacity: 0.9,
          }}
        >
          <img
            src={successLogo}
            style={{
              width: 200,
              height: 200,
              display: "block",
              alignSelf: "center",
            }}
            alt="Success message logo"
          />
          <Typography
            variant="h4"
            textAlign={"center"}
            sx={{ color: grey[700], mt: 4 }}
            noWrap
          >
            Congratulation!
          </Typography>
          <Typography
            variant="body1"
            textAlign={"center"}
            sx={{ my: 2, color: grey[700] }}
          >
            Your email has been verfied successfully
          </Typography>
        </Paper>
        <Box sx={{ mt: 2 }}>
          <Button component={RouterLink} to="/login" variant="contained">
            <KeyboardArrowLeft />
            Back To Login
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default SuccessConfirmation;
