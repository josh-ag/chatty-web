import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/appLayout";
import { DashboardLayout } from "../components/dashboardLayout";
import { NotFound } from "../components/notFound";
import ChatScreen from "../screen/chat";
import { RoomScreen } from "../screen/chat/room";
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
    element: <AppLayout />,
    errorElement: <NotFound />,
    children: [
      { element: <HomeScreen />, index: true },
      { path: "success", element: <SuccessConfirmation /> },
    ],
  },
  { path: "chat", element: <RoomScreen /> },
  {
    path: "room/:userId/:roomId",
    element: <ChatScreen />,
  },

  {
    path: "dashboard",
    element: <DashboardLayout />,
    children: [
      {
        element: <DashboardScreen />,
        index: true,
      },
      { path: "notifications", element: <NotificationScreen /> },
      { path: "settings", element: <SettingsScreen /> },
      { path: "profile", element: <ProfileScreen /> },
      { path: "profile/edit/:id", element: <EditScreen /> },
    ],
  },
  {
    path: "login",
    element: <LoginScreen />,
  },
  {
    path: "signup",
    element: <SignupScreen />,
  },
  { path: "/password/forgot", element: <ForgotPasswordScreen /> },
  { path: "/password/new", element: <NewPassword /> },
  { path: "/account/verify", element: <VerifyScreen /> },
]);
