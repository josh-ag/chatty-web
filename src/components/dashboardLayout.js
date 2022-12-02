import * as React from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import {
  List,
  ListItemText,
  CssBaseline,
  ListItem,
  ListItemIcon,
  Box,
  Avatar,
  Button,
  Typography,
  Tooltip,
  CircularProgress,
  useTheme,
} from "@mui/material";

import { Link, useLocation, Navigate } from "react-router-dom";
import { blue, grey, red } from "@mui/material/colors";
import chatty_logo from "../assets/rounded-chat.png";
import { useDispatch, useSelector } from "react-redux";
import { Authenticate, logOut } from "../features/reducers/authSlice";
import personIcon from "../assets/person.svg";
import settingsIcon from "../assets/Settings-alt.svg";
import homeIcon from "../assets/Home.svg";
import logoutIcon from "../assets/Logout.svg";
import videoIcon from "../assets/videoChat.svg";
import backIcon from "../assets/Caret right.svg";
import crossIcon from "../assets/Cross.svg";

const drawerWidth = 240;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: theme.spacing(0, 0),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const DashboardLayout = (props) => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const { isAuthenticated, isLoading } = useSelector((state) => state.auth);

  const theme = useTheme();
  const dispatch = useDispatch();

  //handle logout
  const handleLogout = () => {
    dispatch(logOut());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(Authenticate());
  }, [dispatch]);

  if (isLoading) {
    return (
      <Box
        sx={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <CircularProgress size={"2rem"} />
        <Typography
          variant="caption"
          sx={{ textAlign: "center", color: grey[600], mt: 2 }}
        >
          Please wait...
        </Typography>
      </Box>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: homeIcon,
    },

    {
      title: "Profile",
      path: `/dashboard/profile`,
      icon: personIcon,
    },

    {
      title: "Chats",
      path: `/chat`,
      icon: videoIcon,
    },

    {
      title: "Settings",
      path: `/dashboard/settings`,
      icon: settingsIcon,
    },
  ];

  return (
    <Box sx={{ display: "flex", minWidth: "100%" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} elevation={0}>
        <DrawerHeader>
          <List>
            <ListItem component={Link} to="/" sx={{ justifyContent: "center" }}>
              <Avatar src={chatty_logo} sx={{ width: 50, height: 50, mr: 1 }} />
              <Typography variant="h5" sx={{ color: grey[800] }}>
                Chatty
              </Typography>
            </ListItem>
            {open ? (
              <ListItem sx={{ justifyContent: "center" }}>
                <Button color="warning" onClick={handleDrawerClose}>
                  <Avatar src={crossIcon} sx={{ width: 24, height: 24 }} />
                  close
                </Button>
              </ListItem>
            ) : (
              <ListItem
                onClick={handleDrawerOpen}
                sx={{ alignSelf: "flex-end" }}
              >
                <Tooltip title="Expand" placement="right-start">
                  <ListItemIcon>
                    <Avatar src={backIcon} />
                  </ListItemIcon>
                </Tooltip>
                <ListItemText color="primary">Open</ListItemText>
              </ListItem>
            )}
          </List>
        </DrawerHeader>

        <List>
          {menuItems.map((item) => (
            <ListItem
              key={item.title}
              sx={{
                ":hover": { color: theme.palette.primary.main },
                bgcolor:
                  location.pathname === item.path ? blue[50] : grey["A50"],
                textDecoration: "none",
                color:
                  location.pathname === item.path
                    ? theme.palette.primary.main
                    : grey[700],
              }}
              component={Link}
              to={item.path}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path
                      ? theme.palette.primary.main
                      : grey[500],
                }}
              >
                <Avatar
                  src={item.icon}
                  sx={{
                    width: 30,
                    height: 30,
                    color:
                      location.pathname === item.path
                        ? theme.palette.primary.main
                        : grey[500],
                  }}
                />
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <List sx={{ position: "absolute", bottom: 0 }}>
          <ListItem sx={{ color: red[700] }} onClick={handleLogout}>
            <ListItemIcon>
              <Avatar src={logoutIcon} />
            </ListItemIcon>
            <ListItemText primary="Logout" color="warning" />
          </ListItem>
        </List>
      </Drawer>
      <Box
        sx={{
          width: "100%",
        }}
      >
        {/* <Outlet /> */}
        {props.children}
      </Box>
    </Box>
  );
};
