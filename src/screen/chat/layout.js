import {
  Box,
  AppBar,
  Container,
  Toolbar,
  Avatar,
  Typography,
} from "@mui/material";

import chattyLogo from "../../assets/rounded-chat.png";

export const Layout = (props) => {
  return (
    <Box
      sx={{
        overflow: "hidden",
        height: "100vh",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <AppBar
        position="static"
        sx={{ background: "transparent" }}
        elevation={0}
      >
        <Container>
          <Toolbar>
            <Avatar src={chattyLogo} />
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Typography
          variant="h5"
          color="text.secondary"
          sx={{ textAlign: "center", mt: 2 }}
          noWrap
        >
          Welcome To The Next Generation Chat!
        </Typography>
      </Container>

      {/* other codes */}

      {props.children}
    </Box>
  );
};
