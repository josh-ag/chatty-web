import { useState, useEffect } from "react";
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
import {
  MenuOutlined,
  Close,
  Search,
  SearchRounded,
  DashboardRounded,
  PermContactCalendarRounded,
  HomeRounded,
  HelpRounded,
  DashboardCustomizeOutlined,
  VideoCallOutlined,
  VideoCallRounded,
} from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import chattyLogo from "../assets/rounded-chat.png";
import { deepPurple, grey } from "@mui/material/colors";
import { styled } from "@mui/system";

const statusBarHeight = 50;

const SearchButton = styled(Button)(({ theme }) => ({
  backgroundColor: "#fff",
  color: grey[700],
  "&:hover": {
    backgroundColor: grey[100],
  },
}));

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
              onClick={() => setSearch(false)}
              sx={(theme) => ({
                p: "10px",
                color: theme.palette.primary.light,
              })}
              aria-label="search-back-button"
            >
              <Close fontSize="medium" color="inherit" />
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
              <Search color="inherit" />
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
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const loginId = localStorage.getItem("loginId");
    if (!token || !loginId) {
      navigate("/login");
    }
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

    setState({ ...state, [anchor]: open });
  };

  //drawerListItems
  const drawerListItems = [
    { path: "/", name: "Home", icon: <HomeRounded /> },
    { path: "/about", name: "About", icon: <HelpRounded /> },
    {
      path: "/contact",
      name: "Contact",
      icon: <PermContactCalendarRounded />,
    },

    { path: "/", name: "Chat", icon: <VideoCallRounded /> },
    { path: "/dashboard", name: "Dashboard", icon: <DashboardRounded /> },
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
            button
            sx={{
              textDecoration: "none",
              color: grey[700],
              ":active": {
                color: "inherit",
              },
            }}
          >
            <ListItemIcon>{item?.icon}</ListItemIcon>
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
            <Stack>
              <Button
                onClick={toggleDrawer("top", true)}
                sx={{
                  borderRadius: 4,
                  display: {
                    sm: "block",
                    md: "none",
                  },
                }}
                color={active ? "inherit" : "success"}
                size="small"
                variant="outlined"
              >
                <MenuOutlined color={active ? "inherit" : "success"} />
              </Button>
            </Stack>

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
              <Button
                component={RouterLink}
                to="/about"
                sx={{ color: active ? "inherit" : grey[700] }}
              >
                About
              </Button>

              <Button
                component={RouterLink}
                to="/contact"
                sx={{ color: active ? "inherit" : grey[700] }}
              >
                Contact
              </Button>

              <>
                <Button
                  onClick={() => setIsSearch(!isSearch)}
                  sx={{ borderRadius: 4 }}
                  color={active ? "inherit" : "success"}
                  variant="outlined"
                >
                  <SearchRounded
                    fontSize="medium"
                    sx={{ color: active ? grey[50] : grey[600] }}
                  />
                </Button>
                <Button
                  component={RouterLink}
                  to="/"
                  sx={{ borderRadius: 4 }}
                  color={active ? "inherit" : "success"}
                  size="small"
                  variant="outlined"
                >
                  <VideoCallOutlined
                    sx={{ color: active ? grey[50] : grey[600] }}
                    fontSize="small"
                  />
                </Button>
                <Button
                  disableRipple
                  sx={{ borderRadius: 4 }}
                  color={active ? "inherit" : "success"}
                  size="small"
                  variant="outlined"
                  component={RouterLink}
                  to="/dashboard"
                >
                  <DashboardCustomizeOutlined
                    sx={{ color: active ? "#ddd" : grey[700] }}
                  />
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
          open={state["top"]}
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
