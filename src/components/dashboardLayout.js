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
} from "@mui/material";
import {
  ArrowBackIosNewOutlined,
  ArrowForwardIosOutlined,
  CancelOutlined,
  DashboardOutlined,
  FavoriteBorderOutlined,
  LogoutRounded,
  NotificationsOutlined,
  PersonOutlined,
  SettingsOutlined,
  VideoCallOutlined,
} from "@mui/icons-material";
import { Link, useLocation, useNavigate, Navigate } from "react-router-dom";
import { blue, grey, red } from "@mui/material/colors";
import chatty_logo from "../assets/rounded-chat.png";

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
  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");
  const loginId = localStorage.getItem("loginId");

  //logout user
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loginId");
    setTimeout(() => window.location.reload(), 500);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: <DashboardOutlined sx={{ color: "inherit" }} />,
    },
    {
      title: "Chat",
      path: `/`,
      icon: <VideoCallOutlined fontSize="medium" sx={{ color: "inherit" }} />,
    },
    {
      title: "Profile",
      path: `/profile/`,
      icon: <PersonOutlined sx={{ color: "inherit" }} />,
    },
    {
      title: "Favorites",
      path: `/dashboard/favorites`,
      icon: <FavoriteBorderOutlined sx={{ color: "inherit" }} />,
    },
    {
      title: "Notifications",
      path: `/dashboard/notifications`,
      icon: (
        <NotificationsOutlined fontSize="medium" sx={{ color: "inherit" }} />
      ),
    },

    {
      title: "Settings",
      path: `/dashboard/settings`,
      icon: <SettingsOutlined sx={{ color: "inherit" }} />,
    },
  ];

  if (!token || !loginId) {
    handleLogout();
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex", minWidth: "100%" }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} elevation={0}>
        <DrawerHeader>
          <List>
            <ListItem component={Link} to="/" sx={{ justifyContent: "center" }}>
              <Avatar src={chatty_logo} sx={{ width: 50, height: 50, mr: 1 }} />
              <Typography variant="h5" sx={{ fontSize: 26, color: grey[800] }}>
                Chatty
              </Typography>
            </ListItem>
            {open ? (
              <ListItem>
                <Button
                  startIcon={<ArrowBackIosNewOutlined />}
                  onClick={() => navigate(-1)}
                  disableRipple
                >
                  back
                </Button>
                <Button
                  color="warning"
                  onClick={handleDrawerClose}
                  startIcon={<CancelOutlined />}
                >
                  close
                </Button>
              </ListItem>
            ) : (
              <ListItem onClick={handleDrawerOpen}>
                <Tooltip title="Expand">
                  <ListItemIcon>
                    <ArrowForwardIosOutlined color="primary" />
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
                ":hover": { bgcolor: blue[50] },
                bgcolor:
                  location.pathname === item.path ? blue[50] : grey["A50"],
                textDecoration: "none",
                color: location.pathname === item.path ? blue[700] : grey[700],
              }}
              component={Link}
              to={item.path}
            >
              <ListItemIcon
                sx={{
                  color:
                    location.pathname === item.path ? blue[700] : grey[500],
                }}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItem>
          ))}
        </List>
        <List sx={{ position: "absolute", bottom: 0 }}>
          <ListItem sx={{ color: red[700] }} onClick={handleLogout}>
            <ListItemIcon>
              <LogoutRounded color="warning" />
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
        {props.children}
      </Box>
    </Box>
  );
};
