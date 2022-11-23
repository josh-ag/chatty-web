import { useState } from "react";

import {
  AppBar,
  Toolbar,
  Avatar,
  Paper,
  ButtonGroup,
  Button,
  Typography,
  Container,
} from "@mui/material";
import { grey } from "@mui/material/colors";
import arrowLeft from "../../assets/Caret left.svg";
import { useNavigate } from "react-router-dom";
import settingsIcon from "../../assets/System.svg";
import lightIcon from "../../assets/Sun.svg";
import darkIcon from "../../assets/Moon.svg";

const SettingsScreen = () => {
  const [selectedMode, setSelectedMode] = useState("system");
  const navigate = useNavigate();

  return (
    <Container>
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
            <Avatar src={arrowLeft} sx={{ width: 24, height: 24 }} />
            Back
          </Button>
        </Toolbar>
      </AppBar>

      <Paper
        sx={{
          m: 1,
          p: 4,
          boxShadow: `0px 0px 2px ${grey[400]}`,
          width: "100%",
        }}
      >
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ display: "block" }}
          mb={2}
        >
          Select Mode
        </Typography>
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
        >
          <Button
            sx={{ bgcolor: selectedMode === "light" && "primary.dark" }}
            onClick={() => setSelectedMode("light")}
          >
            <Avatar src={lightIcon} sx={{ width: 24, height: 24, mr: 1 }} />
            Light
          </Button>
          <Button
            sx={{ bgcolor: selectedMode === "dark" && "primary.dark" }}
            onClick={() => setSelectedMode("dark")}
          >
            <Avatar src={darkIcon} sx={{ width: 24, height: 24, mr: 1 }} />
            Dark
          </Button>
          <Button
            sx={{ bgcolor: selectedMode === "system" && "primary.dark" }}
            onClick={() => setSelectedMode("system")}
          >
            <Avatar src={settingsIcon} sx={{ width: 24, height: 24, mr: 1 }} />
            System
          </Button>
        </ButtonGroup>
      </Paper>
    </Container>
  );
};

export default SettingsScreen;
