import { InfoOutlined } from "@mui/icons-material";
import {
  Box,
  Paper,
  Typography,
  Button,
  Avatar,
  Toolbar,
  AppBar,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import arrowLeft from "../../assets/Caret left.svg";
import crossIcon from "../../assets/Cross.svg";

const NotificationScreen = () => {
  const navigate = useNavigate();

  return (
    <Box>
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
            <Avatar src={crossIcon} sx={{ width: 24, height: 24 }} />
          </Button>
        </Toolbar>
      </AppBar>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 4,
          mt: 4,
          alignItems: "center",
        }}
        elevation={0}
      >
        <InfoOutlined fontSize="large" sx={{ color: grey[500], mb: 2 }} />
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          All messages cleared
        </Typography>
      </Paper>
    </Box>
  );
};

export default NotificationScreen;
