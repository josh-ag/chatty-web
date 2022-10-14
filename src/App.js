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
import { blue, green } from "@mui/material/colors";
import { PasswordToken } from "./screen/passwordToken/passwordToken";

function App() {
  const themeConfig = createTheme({
    palette: {
      primary: {
        main: blue[800],
      },
      secondary: {
        main: green[600],
      },
    },
    typography: {
      fontFamily: "Outfit",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
  });
  const theme = responsiveFontSizes(themeConfig);

  return (
    <ThemeProvider theme={theme}>
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
