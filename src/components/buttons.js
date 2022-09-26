import { styled } from "@mui/material/styles";
import { Button } from "@mui/material";

export const ActionButton = styled(Button)(({ theme }) => ({
  background: theme.palette.success.main,
  "&:hover": {
    background: theme.palette.success.light,
  },
}));
