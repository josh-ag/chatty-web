import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//routes
import HomeScreen from "./screen/home";
import SignupScreen from "./screen/signup";
import LoginScreen from "./screen/login";
import ForgotPasswordScreen from "./screen/forgotPassword";
import { AppLayout } from "./components/appLayout";
import { DashboardLayout } from "./components/dashboardLayout";
import SuccessConfirmation from "./screen/sent";
import ChatScreen from "./screen/chat";
import SearchScreen from "./screen/search";
import ErrorScreen from "./screen/error";
import SettingsScreen from "./screen/settings";
import ProfileScreen from "./screen/profile";
import EditScreen from "./screen/profileEdit";
import { NotFound } from "./components/notFound";
import DashboardScreen from "./screen/dashboard";
import FavoritesScreen from "./screen/favorites";
import NotificationScreen from "./screen/notifications";
import { VerifyScreen } from "./screen/verify/verifyScreen";
import NewPassword from "./screen/newPassword";
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
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AppLayout>
                <HomeScreen />
              </AppLayout>
            }
          />

          <Route path="/chat" element={<ChatScreen />} />

          <Route
            path="/dashboard"
            element={
              <DashboardLayout>
                <DashboardScreen />
              </DashboardLayout>
            }
          />

          <Route
            path="/profile"
            element={
              <DashboardLayout>
                <ProfileScreen />
              </DashboardLayout>
            }
          />

          <Route path="/search" element={<SearchScreen />} />
          <Route path="/success" element={<SuccessConfirmation />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />

          <Route
            path="/dashboard/favorites"
            element={
              <DashboardLayout>
                <FavoritesScreen />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/notifications"
            element={
              <DashboardLayout>
                <NotificationScreen />
              </DashboardLayout>
            }
          />
          <Route
            path="/dashboard/settings"
            element={
              <DashboardLayout>
                <SettingsScreen />
              </DashboardLayout>
            }
          />
          <Route path="/password/forgot" element={<ForgotPasswordScreen />} />
          <Route path="/password/new" element={<NewPassword />} />
          <Route path="/account/verify" element={<VerifyScreen />} />
          <Route path="/reset/error" element={<ErrorScreen />} />
          <Route
            path="/profile/edit/:id"
            element={
              <DashboardLayout>
                <EditScreen />
              </DashboardLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
