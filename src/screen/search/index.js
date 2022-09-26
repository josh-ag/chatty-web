import {
  Box,
  Container,
  IconButton,
  Divider,
  Paper,
  InputBase,
  Typography,
} from "@mui/material";

import { ChevronLeft, Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { grey } from "@mui/material/colors";
import { useState } from "react";

const SearchScreen = () => {
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`You Search For: ${searchParam}`);

    setSearchParam("");
  };

  return (
    <Box>
      <Container>
        <Paper
          onSubmit={handleSubmit}
          component="form"
          sx={{
            my: 1,
            p: "2px 4px",
            display: "flex",
            alignItems: "center",
          }}
          elevation={0}
        >
          <IconButton
            sx={{ p: "10px" }}
            aria-label="search-back-button"
            onClick={handleNavigation}
          >
            <ChevronLeft fontSize="large" />
          </IconButton>
          <InputBase
            defaultValue={searchParam}
            onChange={(e) => setSearchParam(e.target.value)}
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search app"
            autoFocus
            inputProps={{ "aria-label": "chatty search" }}
          />
          <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
          <IconButton
            type="submit"
            sx={{ p: "10px" }}
            aria-label="search"
            onClick={handleSubmit}
          >
            <Search fontSize="medium" />
          </IconButton>
        </Paper>

        <Box
          sx={{
            height: "50vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Paper sx={{ p: 2, boxShadow: "none", bgcolor: "transparent" }}>
            {!searchParam && (
              <Typography
                sx={{
                  textAlign: "center",
                  color: grey[600],
                  fontSize: 20,
                }}
                noWrap
              >
                Nothing Was Found!
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default SearchScreen;
