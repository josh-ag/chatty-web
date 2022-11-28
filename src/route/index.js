import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/appLayout";
import { DashboardLayout } from "../components/dashboardLayout";
import { NotFound } from "../components/notFound";
import ChatScreen from "../screen/chat";
import DashboardScreen from "../screen/dashboard";
import ForgotPasswordScreen from "../screen/forgotPassword";
import HomeScreen from "../screen/home";
import LoginScreen from "../screen/login";
import NewPassword from "../screen/newPassword";
import NotificationScreen from "../screen/notifications";
import ProfileScreen from "../screen/profile";
import EditScreen from "../screen/profileEdit";
import SuccessConfirmation from "../screen/sent";
import SettingsScreen from "../screen/settings";
import SignupScreen from "../screen/signup";
import { VerifyScreen } from "../screen/verify/verifyScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <AppLayout>
        <HomeScreen />
      </AppLayout>
    ),
    errorElement: <NotFound />,
  },
  {
    path: "chat",
    element: <ChatScreen />,
  },
  {
    path: "dashboard",
    element: (
      <DashboardLayout>
        <DashboardScreen />
      </DashboardLayout>
    ),
  },
  {
    path: "success",
    element: <SuccessConfirmation />,
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
  {
    path: "signup",
    element: <SignupScreen />,
  },
  {
    path: "dashboard/profile",
    element: (
      <DashboardLayout>
        <ProfileScreen />
      </DashboardLayout>
    ),
  },

  {
    path: "dashboard/profile/edit/:id",
    element: (
      <DashboardLayout>
        <EditScreen />
      </DashboardLayout>
    ),
  },

  {
    path: "/dashboard/notifications",
    element: (
      <DashboardLayout>
        <NotificationScreen />
      </DashboardLayout>
    ),
  },

  {
    path: "dashboard/settings",
    element: (
      <DashboardLayout>
        <SettingsScreen />
      </DashboardLayout>
    ),
  },
  { path: "/password/forgot", element: <ForgotPasswordScreen /> },
  { path: "/password/new", element: <NewPassword /> },
  { path: "/account/verify", element: <VerifyScreen /> },
]);
