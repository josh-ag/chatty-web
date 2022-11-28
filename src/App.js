import { useMemo } from "react";
import { RouterProvider } from "react-router-dom";
import { router } from "./route";
//routes

import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import { CssBaseline } from "@mui/material";
import { useSelector } from "react-redux";
import { grey } from "@mui/material/colors";

function App() {
  const { mode } = useSelector((state) => state.theme);

  // useMemo();
  const themeConfig = useMemo(
    () =>
      createTheme({
        palette: {
          ...(mode === "light"
            ? {
                primary: {
                  main: "#B39CD0",
                },
                secondary: {
                  main: "#DBAFFF",
                },

                background: {
                  default: grey[100],
                  paper: "#fff",
                },
              }
            : {
                primary: {
                  main: "#B39CD0",
                },
                secondary: {
                  main: "#DBAFFF",
                },
              }),
        },
        typography: {
          fontFamily: "Outfit",
          fontWeightLight: 300,
          fontWeightRegular: 400,
          fontWeightMedium: 500,
          fontWeightBold: 700,
        },
      }),
    [mode]
  );
  const theme = responsiveFontSizes(themeConfig);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme={true} />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
