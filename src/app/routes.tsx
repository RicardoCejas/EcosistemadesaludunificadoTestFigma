import { createBrowserRouter } from "react-router";
import AppLayout from "./components/AppLayout";
import DashboardLayout from "./components/DashboardLayout";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import DevAdminDashboard from "./pages/DevAdminDashboard";
import InteroperabilityView from "./pages/Interoperability";
import DicomViewer from "./pages/DicomViewer";
import ChatbotConfig from "./pages/ChatbotConfig";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: Landing },
      { path: "login", Component: Login },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { path: "patient", Component: PatientDashboard },
      { path: "professional", Component: ProfessionalDashboard },
      { path: "center", Component: AdminDashboard },
      { path: "admin", Component: DevAdminDashboard },
      { path: "interoperability", Component: InteroperabilityView },
      { path: "dicom", Component: DicomViewer },
      { path: "chatbot", Component: ChatbotConfig },
    ],
  },
]);
