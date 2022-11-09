import { useState } from "react";
import {
  DarkMode,
  Language,
  LightMode,
  SettingsBrightness,
} from "@mui/icons-material";
import {
  List,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  ButtonGroup,
  Button,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const SettingsScreen = () => {
  const [selectedMode, setSelectedMode] = useState("system");
  return (
    <Paper
      sx={{
        m: 1,
        p: 4,
        boxShadow: `0px 0px 2px ${grey[400]}`,
        width: "100%",
      }}
    >
      <List>
        <ListItem>
          <ListItemIcon>
            <Language />
          </ListItemIcon>
          <ListItemText>Language</ListItemText>
        </ListItem>

        <ListItem
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <ListItemText>Theme</ListItemText>

          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button
              startIcon={<LightMode />}
              sx={{ bgcolor: selectedMode === "light" && "primary.dark" }}
              onClick={() => setSelectedMode("light")}
            >
              Light
            </Button>
            <Button
              startIcon={<DarkMode />}
              sx={{ bgcolor: selectedMode === "dark" && "primary.dark" }}
              onClick={() => setSelectedMode("dark")}
            >
              Dark
            </Button>
            <Button
              startIcon={<SettingsBrightness />}
              sx={{ bgcolor: selectedMode === "system" && "primary.dark" }}
              onClick={() => setSelectedMode("system")}
            >
              System
            </Button>
          </ButtonGroup>
        </ListItem>
      </List>
    </Paper>
  );
};

export default SettingsScreen;
