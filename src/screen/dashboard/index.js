import * as React from "react";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { Box, CircularProgress, Grid, Paper, useTheme } from "@mui/material";
import { useGetProfileQuery } from "../../features/services/queries";
import { Navigate } from "react-router-dom";

const DashboardScreen = () => {
  const theme = useTheme();

  const { data, isLoading, error } = useGetProfileQuery();

  console.log(error);
  if (error && error?.originalStatus === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("loginId");

    return <Navigate to="/login" />;
  }

  return (
    <>
      <Box
        style={{
          background: theme.palette.primary.light,
          height: 250,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
        }}
      >
        {isLoading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="headline1" sx={{ color: "error.main" }}>
            {error?.message || error?.error}
          </Typography>
        ) : (
          <Typography variant="h4" sx={{ color: grey[100] }} noWrap>
            Welcome Back, {data?.user.username}!
          </Typography>
        )}
      </Box>
      <Grid container sx={{ width: "100%", alignItems: "stretch", p: 1 }}>
        <Grid item xs={12} sm={12} md={6} p={1}>
          <Paper
            sx={{
              height: 400,
              width: "100%",
              p: 2,
            }}
          >
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              sx={{ color: grey[700], fontWeight: 300 }}
            >
              Analytics
            </Typography>
            <Typography color="text.secondary">
              Upon use, usage data will appear here
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={6} p={1}>
          <Paper sx={{ height: "100%", p: 2 }}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: grey[700], fontWeight: 300 }}
            >
              Recent Activity
            </Typography>
            <Typography sx={{ color: grey[600] }}>Nothing yet!</Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} sm={12} md={12} p={1}>
          <Paper sx={{ p: 2, height: 400 }}>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: grey[700], fontWeight: 300 }}
            >
              Recent Video Calls
            </Typography>
            <Typography sx={{ color: grey[600] }}>Nothing yet!</Typography>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default DashboardScreen;
