import { Typography, Button } from "@mui/material";
import { ArrowBack } from "@mui/icons-material";
import { grey } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

export const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h2"
        sx={{
          mb: 1,
          textAlign: "center",
          color: grey[900],
        }}
        noWrap
      >
        Oops!
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          textAlign: "center",
          color: grey[700],
        }}
        noWrap
      >
        This page do not exist
      </Typography>

      <Button
        variant="contained"
        onClick={() => navigate(-1)}
        sx={{ mt: 4 }}
        startIcon={<ArrowBack />}
      >
        Take Me Back
      </Button>
    </div>
  );
};
