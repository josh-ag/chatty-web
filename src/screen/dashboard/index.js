import * as React from "react";
import Typography from "@mui/material/Typography";
import { blue, grey } from "@mui/material/colors";
import {
  AppBar,
  Avatar,
  Backdrop,
  Box,
  CircularProgress,
  Grid,
  IconButton,
  Paper,
  Stack,
  Toolbar,
  useTheme,
} from "@mui/material";
import { useGetProfileQuery } from "../../features/services/queries";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOut } from "../../features/reducers/authSlice";
import chatIcon from "../../assets/Chat.svg";
import userIcon from "../../assets/user.svg";

const DashboardScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetProfileQuery();

  if (error && error?.originalStatus === 401) {
    dispatch(logOut());

    return <Navigate to="/login" />;
  }

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: "transparent", height: 73, justifyContent: "center" }}
      >
        <Toolbar>
          <Box sx={{ flex: 1, justifyContent: "flex-start" }}>
            {error && (
              <Typography variant="headline1" sx={{ color: "error.main" }}>
                {error?.message || error?.error.split(":")[1]}
              </Typography>
            )}
            {data?.user && (
              <Typography variant="h4" sx={{ color: grey[600] }} noWrap>
                Welcome Back, {data?.user.username}!
              </Typography>
            )}
          </Box>
          <Stack direction={"row"} sx={{ alignItems: "center" }} spacing={-1}>
            <IconButton
              disableRipple
              color="primary"
              onClick={() => navigate("/profile")}
            >
              <Avatar
                src={data?.user?.profilePicture?.url || userIcon}
                sx={{ width: 35, height: 35 }}
              />
            </IconButton>
            <IconButton
              disableRipple
              onClick={() => navigate("/dashboard/notifications")}
            >
              <Avatar src={chatIcon} sx={{ width: 35, height: 35 }} />
            </IconButton>
          </Stack>
        </Toolbar>
      </AppBar>

      <Grid container sx={{ width: "100%", alignItems: "stretch", p: 1 }}>
        <Grid item xs={12} sm={12} md={6} p={1}>
          <Paper
            elevation={0}
            sx={{
              height: 400,
              width: "100%",
              p: 2,
              borderRadius: 6,
              boxShadow: "0px 1px 2px  #ddd",
            }}
          >
            <Typography gutterBottom variant="h5" sx={{ color: grey[600] }}>
              Usage History
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Upon use, usage data will appear here
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} p={1}>
          <Paper
            elevation={0}
            sx={{
              height: "100%",
              p: 2,
              borderRadius: 6,
              boxShadow: "0px 1px 2px  #ddd",
            }}
          >
            <Typography gutterBottom variant="h5" sx={{ color: grey[600] }}>
              Recent Activity
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Nothing yet!
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} p={1}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              height: 400,
              borderRadius: 6,
              boxShadow: "0px 1px 2px  #ddd",
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: grey[700], fontWeight: 300 }}
            >
              Chat History
            </Typography>
            <Typography color="text.secondary" variant="body2">
              Nothing yet!
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardScreen;
