import { useMemo } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//routes
import HomeScreen from "./screen/home";
import SignupScreen from "./screen/signup";
import ContactScreen from "./screen/contact";
import AboutScreen from "./screen/about";
import LoginScreen from "./screen/login";
import ForgotPasswordScreen from "./screen/forgotPassword";
import { AppLayout } from "./components/appLayout";
import { DashboardLayout } from "./components/dashboardLayout";
import SuccessConfirmation from "./screen/sent";
import ResetPasswordScreen from "./screen/resetPassword";
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
import {
  createTheme,
  responsiveFontSizes,
  ThemeProvider,
} from "@mui/material/styles";

import { PasswordToken } from "./screen/passwordToken/passwordToken";
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
                  // main: amber[500],
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
                // background: { paper: "#52546B", default: "#191B2A" },
                // text: { primary: "#EDEDEE", secondary: grey[300] },
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
          <Route
            path="/contact"
            element={
              <AppLayout>
                <ContactScreen />
              </AppLayout>
            }
          />
          <Route path="/chat" element={<ChatScreen />} />
          <Route
            path="/about"
            element={
              <AppLayout>
                <AboutScreen />
              </AppLayout>
            }
          />

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
          <Route path="/forgot" element={<ForgotPasswordScreen />} />
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

          <Route path="/password/new" element={<ResetPasswordScreen />} />
          <Route path="/account/verify" element={<VerifyScreen />} />
          <Route path="/password/token" element={<PasswordToken />} />
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
