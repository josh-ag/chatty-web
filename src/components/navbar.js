import { useState } from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Link,
  Avatar,
  Button,
  IconButton,
  InputBase,
  Paper,
  Container,
  Stack,
  ListItemIcon,
  Divider,
  List,
  Drawer,
  ListItem,
  ListItemText,
} from "@mui/material";
import { SearchRounded } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import chattyLogo from "../assets/rounded-chat.png";
import { deepPurple, grey } from "@mui/material/colors";
import { styled } from "@mui/system";
import lensIcon from "../assets/Search.svg";
import gridIcon from "../assets/Layout.svg";
import videoIcon from "../assets/Video.svg";
import crossIcon from "../assets/Cross.svg";
import homeIcon from "../assets/homeIcon.svg";
import menuIcon from "../assets/Menu.svg";

const statusBarHeight = 50;

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: grey[700],
  "&:hover": {
    backgroundColor: grey[100],
  },
}));

//desktop search component
const SearchPage = ({ setSearch }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You Search For: ${query}`);
    setQuery("");
  };

  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        width: "100%",
        height: "100vh",
        top: 0,
        left: 0,
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        backdropFilter: "blur(5px)",
      })}
    >
      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          p: 2,
        }}
      >
        <Paper
          sx={{
            height: "50vh",
            mt: 5,
            width: "80%",
            borderRadius: 5,
            alignSelf: "center",
            boxShadow: "0px 0px 10px #ddd",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
          }}
          elevation={0}
        >
          <Paper
            onSubmit={handleSubmit}
            component="form"
            sx={{
              my: 1,
              width: "100%",
              p: "2px 8px",
              display: "flex",
              alignItems: "center",
            }}
            elevation={0}
          >
            <IconButton
              disableRipple
              onClick={() => setSearch(false)}
              sx={(theme) => ({
                p: "10px",
                color: theme.palette.primary.light,
              })}
              aria-label="search-back-button"
            >
              <Avatar src={crossIcon} sx={{ width: 24, height: 24 }} />
            </IconButton>
            <InputBase
              defaultValue={query}
              onChange={(e) => setQuery(e.target.value)}
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search app"
              autoFocus
              inputProps={{ "aria-label": "chatty search" }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="submit"
              sx={(theme) => ({
                p: "10px",
                color: theme.palette.primary.light,
              })}
              aria-label="search"
              onClick={handleSubmit}
            >
              <Avatar src={lensIcon} sx={{ width: 24, height: 24 }} />
            </IconButton>
          </Paper>
          <Divider orientation="horizontal" sx={{ width: "100%" }} />
          <Typography mt={4}>No Result Found</Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default function Navbar() {
  //navbar state
  const [active, setActive] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  //Drawer State
  const [drawPosition, setDrawPosition] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  //handle change bgcolor onscroll
  const changeBackground = () => {
    if (window.scrollY >= statusBarHeight) {
      return setActive(true);
    }
    setActive(false);
  };
  window.addEventListener("scroll", changeBackground);

  //handle toggle drawer @Mobile
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setDrawPosition({ ...drawPosition, [anchor]: open });
  };

  //drawerListItems
  const drawerListItems = [
    { path: "/", name: "Home", icon: homeIcon },
    { path: "/chat", name: "Chat", icon: videoIcon },
    { path: "/dashboard", name: "Dashboard", icon: gridIcon },
  ];

  //drawer items
  const drawerItems = (anchor) => (
    <Box
      sx={{
        width: anchor === "top" || anchor === "bottom" ? "auto" : 250,
        bgcolor: deepPurple[50],
      }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{ alignItems: "center", justifyContent: "center" }}>
        {drawerListItems.map((item) => (
          <ListItem
            key={item.name}
            component={RouterLink}
            to={item.path}
            sx={{
              textDecoration: "none",
              color: grey[700],
              ":active": {
                color: "inherit",
                alignSelf: "center",
              },
            }}
          >
            <ListItemIcon>
              <Avatar src={item.icon} sx={{ width: 30, height: 30 }} />
            </ListItemIcon>
            <ListItemText>{item?.name}</ListItemText>
          </ListItem>
        ))}
      </List>

      <List>
        <ListItem component={RouterLink} to="/search">
          <SearchButton fullWidth endIcon={<SearchRounded fontSize="large" />}>
            Search
          </SearchButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          bgcolor: active ? "primary" : "background.default",
          // bgcolor: "background.default",
        }}
        elevation={0}
      >
        <Container>
          <Toolbar
            sx={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Stack direction={"row"} sx={{ flex: 1 }}>
              <Avatar
                edge="start"
                sx={{ width: 45, height: 45 }}
                src={chattyLogo}
                alt="chatty navbar logo"
              />
              <Typography noWrap component="div" sx={{ flexGrow: 1 }}>
                <Link
                  component={RouterLink}
                  to="/"
                  color={active ? "inherit" : grey[900]}
                  sx={{ textDecoration: "none", fontSize: 26, fontWeight: 600 }}
                  ml={2}
                >
                  Chatty
                </Link>
              </Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: {
                  xs: "block",
                  sm: "block",
                  md: "none",
                  lg: "none",
                  xl: "none",
                },
              }}
            >
              <Button
                onClick={toggleDrawer("top", true)}
                sx={{ borderRadius: 4 }}
                color={active ? "inherit" : "secondary"}
                variant="outlined"
              >
                <Avatar src={menuIcon} sx={{ width: 24, height: 24 }} />
              </Button>
            </Stack>

            {/* ONLY VISIBLE @DESKTOP  */}
            <Stack
              direction="row"
              spacing={2}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "inherit",
                  lg: "inherit",
                },
              }}
            >
              <>
                <Button
                  onClick={() => setIsSearch(!isSearch)}
                  sx={{ borderRadius: 4 }}
                  color={active ? "inherit" : "secondary"}
                  variant="outlined"
                >
                  <Avatar src={lensIcon} sx={{ width: 24, height: 24 }} />
                </Button>
                <Button
                  component={RouterLink}
                  to="/chat"
                  sx={{ borderRadius: 4 }}
                  color={active ? "inherit" : "secondary"}
                  size="small"
                  variant="outlined"
                >
                  <Avatar src={videoIcon} sx={{ width: 24, height: 24 }} />
                </Button>
                <Button
                  disableRipple
                  sx={{ borderRadius: 4 }}
                  color={active ? "inherit" : "secondary"}
                  size="small"
                  variant="outlined"
                  component={RouterLink}
                  to="/dashboard"
                >
                  <Avatar src={gridIcon} sx={{ width: 24, height: 24 }} />
                </Button>
              </>
            </Stack>
          </Toolbar>
        </Container>

        {/* Drawer */}
        <Drawer
          sx={{
            width: "100%",
            display: {
              xs: "block",
              sm: "block",
              md: "none",
              lg: "none",
              xl: "none",
            },
          }}
          anchor={"top"}
          open={drawPosition["top"]}
          onClose={toggleDrawer("top", false)}
          elevation={0}
        >
          {drawerItems("top")}
        </Drawer>
      </AppBar>
      {isSearch && <SearchPage setSearch={setIsSearch} />}
    </>
  );
}
