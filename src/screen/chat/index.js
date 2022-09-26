import { Box, Container, Typography } from "@mui/material";

import { Navigate } from "react-router-dom";

const ChatScreen = () => {
  if (!localStorage.getItem("loginId")) {
    return <Navigate to={`/login`} />;
  }

  return (
    <Box>
      <Container>
        <Typography sx={{ textAlign: "center" }}>Chat screen</Typography>
      </Container>
    </Box>
  );
};

export default ChatScreen;
