import { Box } from "@mui/system";
import Navbar from "./navbar";
import styled from "@emotion/styled";
import FooterComponent from "./footer";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Authenticate } from "../features/reducers/authSlice";
import { Navigate } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CssBaseline } from "@mui/material";

const CustomeBox = styled(Box)(({ theme }) => ({
  height: theme.mixins.toolbar.minHeight,
}));

export const AppLayout = (props) => {
  const { isLoading, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
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
  } else if (isAuthenticated) {
    return (
      <div>
        <CssBaseline />
        {/* appbar */}
        <Navbar />

        {/* pages */}
        <div>
          <CustomeBox />
          {props.children}
        </div>
        <FooterComponent />
      </div>
    );
  } else {
    return <Navigate to={"/login"} />;
  }
};
