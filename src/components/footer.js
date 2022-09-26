import { Box, Typography } from "@mui/material";

const FooterComponent = () => {
  return (
    <Box p={4}>
      <Typography
        variant="body2"
        sx={{ fontSize: 16, textAlign: "center", color: "#333" }}
      >
        &copy; Chatty 2022
      </Typography>
    </Box>
  );
};

export default FooterComponent;
