import { Box, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const AboutScreen = () => {
  return (
    <Box sx={{ mt: 6, pt: 4 }}>
      <Typography
        variant="h2"
        textAlign={"center"}
        sx={{ color: grey[700] }}
        noWrap
      >
        About Screen
      </Typography>
    </Box>
  );
};

export default AboutScreen;
