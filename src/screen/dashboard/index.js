import * as React from "react";
import Typography from "@mui/material/Typography";
import { grey } from "@mui/material/colors";
import { Card, CardContent, Grid } from "@mui/material";

const DashboardScreen = () => {
  return (
    <Grid container spacing={2} sx={{ px: 1, my: 1 }}>
      <Grid item xs={12} sm={12} md={6} component="div">
        <Card
          sx={{ bgcolor: grey[100], boxShadow: `0px 0px 2px ${grey[400]}` }}
        >
          <CardContent>
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
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} component="div">
        <Card
          sx={{ bgcolor: grey[100], boxShadow: `0px 0px 2px ${grey[400]}` }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: grey[700], fontWeight: 300 }}
            >
              Recent Activity
            </Typography>
            <Typography sx={{ color: grey[600] }}>Nothing yet!</Typography>
          </CardContent>
        </Card>
      </Grid>

      <Grid item xs={12} sm={12} md={6} component="div">
        <Card
          sx={{ bgcolor: grey[100], boxShadow: `0px 0px 2px ${grey[400]}` }}
        >
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              sx={{ color: grey[700], fontWeight: 300 }}
            >
              Recent Video Calls
            </Typography>
            <Typography sx={{ color: grey[600] }}>Nothing yet!</Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default DashboardScreen;
