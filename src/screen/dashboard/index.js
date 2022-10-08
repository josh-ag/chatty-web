import * as React from "react";
import Typography from "@mui/material/Typography";
import { blue, blueGrey, grey } from "@mui/material/colors";
import { Box, Grid } from "@mui/material";

const DashboardScreen = () => {
  return (
    <Grid
      container
      sx={{ width: "100%", alignItems: "stretch", p: 1 }}
      spacing={1}
    >
      <Grid item xs={12} sm={12} md={6} component="div">
        <Box
          sx={{
            bgcolor: blue[100],
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
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={6} component="div">
        <Box sx={{ bgcolor: "darkgray", height: "100%", p: 2 }}>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ color: grey[700], fontWeight: 300 }}
          >
            Recent Activity
          </Typography>
          <Typography sx={{ color: grey[600] }}>Nothing yet!</Typography>
        </Box>
      </Grid>

      <Grid item xs={12} sm={12} md={12} component="div">
        <Box sx={{ bgcolor: blueGrey[200], p: 2, height: 400 }}>
          <Typography
            gutterBottom
            variant="h5"
            sx={{ color: grey[700], fontWeight: 300 }}
          >
            Recent Video Calls
          </Typography>
          <Typography sx={{ color: grey[600] }}>Nothing yet!</Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default DashboardScreen;
