import { ColorizeOutlined, Language } from "@mui/icons-material";
import {
  Box,
  List,
  Paper,
  ListItem,
  ListItemIcon,
  ListItemText,
  Grid,
} from "@mui/material";
import { grey } from "@mui/material/colors";

const SettingsScreen = () => {
  const SettingsItems = [
    { title: "Language", icon: <Language /> },
    { title: "theme", icon: <ColorizeOutlined /> },
  ];

  return (
    <Grid container sx={{ my: 1, mx: 1 }}>
      <Grid item xs={12} sm={10} md={8}>
        <Paper
          sx={{
            p: 4,
            bgcolor: grey[100],
            boxShadow: `0px 0px 2px ${grey[400]}`,
          }}
        >
          <List>
            {SettingsItems.map((item) => (
              <ListItem key={item.title}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>{item.title}</ListItemText>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SettingsScreen;
