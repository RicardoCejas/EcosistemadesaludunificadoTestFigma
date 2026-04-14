import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import MobileMenu from "../../components/MobileMenu";
import PatientDashboard from "../../components/PatientDashboard";
import DoctorDashboard from "../../components/DoctorDashboard";
import AdminDashboard from "../../components/AdminDashboard";
import DicomVisor from "../../components/DicomVisor";
import CenterDashboard from "../pages/AdminDashboard";
import InteroperabilityView from "../pages/Interoperability";
import ChatbotConfig from "../pages/ChatbotConfig";
import { AppRole, DemoView, useAppContext } from "../../context/AppContext";

export default function DashboardLayout() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { role, setRole, currentView, setCurrentView, isDark, toggleTheme } = useAppContext();
  const path = location.pathname;

  const getRoleFromPath = (): AppRole => {
    if (path.includes("/professional")) return "profesional";
    if (path.includes("/center")) return "centro";
    if (path.includes("/admin")) return "admin";
    if (currentView === "medico") return "profesional";
    if (currentView === "centro") return "centro";
    if (currentView === "admin") return "admin";
    return "paciente";
  };

  const mapPathToView = (): DemoView | null => {
    if (path.includes("/professional")) return "medico";
    if (path.includes("/center")) return "centro";
    if (path.includes("/admin")) return "admin";
    if (path.includes("/patient")) return "paciente";
    return null;
  };

  useEffect(() => {
    const pathRole = getRoleFromPath();
    if (role !== pathRole) {
      setRole(pathRole);
    }

    const pathView = mapPathToView();
    if (pathView && currentView !== pathView) {
      setCurrentView(pathView);
    }
  }, [path, role, currentView, setRole, setCurrentView]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [path]);

  const patientLinks = [
    { to: "/dashboard/patient", label: "Mi Panel" },
    { to: "/dashboard/interoperability", label: "Historia Interoperable" },
    { to: "/dashboard/dicom", label: "Mis Imagenes (DICOM)" },
  ];

  const professionalLinks = [
    { to: "/dashboard/professional", label: "Mi Panel" },
    { to: "/dashboard/interoperability", label: "Bus Interoperabilidad" },
    { to: "/dashboard/dicom", label: "Visor DICOM" },
  ];

  const adminLinks = [
    { to: "/dashboard/admin", label: "Panel de Metricas" },
    { to: "/dashboard/interoperability", label: "Interoperabilidad HL7" },
    { to: "/dashboard/chatbot", label: "Automatizaciones WA" },
    { to: "/dashboard/dicom", label: "Test Visor DICOM" },
  ];

  const centerLinks = [
    { to: "/dashboard/center", label: "Gestion Institucional" },
    { to: "/dashboard/interoperability", label: "Interoperabilidad" },
    { to: "/dashboard/dicom", label: "Visor DICOM" },
  ];

  const links =
    currentView === "admin"
      ? adminLinks
      : currentView === "centro"
        ? centerLinks
        : currentView === "medico"
          ? professionalLinks
          : patientLinks;

  const handleViewChange = (view: DemoView, destination: string) => {
    setCurrentView(view);
    navigate(destination);
  };

  const handleLogout = () => {
    setRole(null);
    setCurrentView("paciente");
    navigate("/");
  };

  const getRoleTitle = () => {
    if (currentView === "admin") return "Panel de Administracion";
    if (currentView === "centro") return "Centro de Salud";
    if (currentView === "medico") return "Panel del Profesional";
    return "Portal del Paciente";
  };

  const getInitials = () => {
    if (currentView === "admin") return "AD";
    if (currentView === "centro") return "CS";
    if (currentView === "medico") return "DR";
    return "JD";
  };

  const renderCurrentView = () => {
    if (path.includes("/interoperability")) return <InteroperabilityView />;
    if (path.includes("/dicom")) return <DicomVisor />;
    if (path.includes("/chatbot")) return <ChatbotConfig />;
    if (currentView === "medico") return <DoctorDashboard />;
    if (currentView === "centro") return <CenterDashboard />;
    if (currentView === "admin") return <AdminDashboard />;
    return <PatientDashboard />;
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors">
      <Sidebar links={links} currentView={currentView} onViewChange={handleViewChange} onLogout={handleLogout} />
      <MobileMenu
        open={mobileMenuOpen}
        links={links}
        currentView={currentView}
        onClose={() => setMobileMenuOpen(false)}
        onViewChange={handleViewChange}
        onLogout={handleLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar
          title={getRoleTitle()}
          initials={getInitials()}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          showMenuButton
          onMenuClick={() => setMobileMenuOpen(true)}
        />

        <main className="flex-1 overflow-auto bg-slate-50/50 dark:bg-slate-950 p-4 sm:p-6 lg:p-8 transition-colors">
          <div className="max-w-6xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${currentView}-${path}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.24, ease: "easeOut" }}
              >
                {renderCurrentView()}
              </motion.div>
            </AnimatePresence>
            <div className="hidden">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
