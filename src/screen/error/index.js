import { Backdrop, Box, Typography } from "@mui/material";

const ErrorScreen = () => {
  return (
    <Box>
      <Backdrop>
        <Typography>Error Occured!</Typography>
      </Backdrop>
    </Box>
  );
};

export default ErrorScreen;
