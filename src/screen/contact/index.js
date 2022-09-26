import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const ContactScreen = () => {
  return (
    <Box sx={{ mt: 6, pt: 4 }}>
      <Typography
        variant="h2"
        textAlign={"center"}
        sx={{ color: grey[700] }}
        noWrap
      >
        Contact Screen
      </Typography>
    </Box>
  );
};

export default ContactScreen;
