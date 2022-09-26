import { FavoriteRounded } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";

const FavoritesScreen = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          p: 4,
          mt: 4,
          alignItems: "center",
        }}
        elevation={0}
      >
        <FavoriteRounded fontSize="large" sx={{ color: grey[500], mb: 2 }} />
        <Typography variant="body2" sx={{ color: grey[700], fontSize: "16px" }}>
          Nothing in your favorites
        </Typography>
      </Paper>
    </Box>
  );
};

export default FavoritesScreen;
