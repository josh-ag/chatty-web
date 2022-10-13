import { ColorizeOutlined, Language } from "@mui/icons-material";
import {
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
    <Grid
      container
      sx={{ width: "100%", alignItems: "stretch", p: 1 }}
      spacing={1}
    >
      <Grid item xs={12} sm={12}>
        <Paper
          sx={{
            p: 4,
            bgcolor: grey[100],
            boxShadow: `0px 0px 2px ${grey[400]}`,
            width: "100%",
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
