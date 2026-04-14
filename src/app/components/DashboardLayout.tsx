import { Outlet, NavLink, useNavigate, useLocation } from "react-router";
import { 
  LogOut, 
  Activity, 
  User, 
  Calendar as CalendarIcon, 
  FileText, 
  Settings, 
  Stethoscope, 
  Users,
  CreditCard,
  Bell,
  LayoutDashboard,
  MessageCircle,
  Network
} from "lucide-react";

export default function DashboardLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;

  const isProfessional = path.includes('/professional');
  const isAdmin = path.includes('/admin') || path.includes('/interoperability') || path.includes('/dicom') || path.includes('/chatbot');

  const patientLinks = [
    { to: "/dashboard/patient", icon: User, label: "Mi Panel" },
    { to: "/dashboard/interoperability", icon: Network, label: "Historia Interoperable" },
    { to: "/dashboard/dicom", icon: FileText, label: "Mis Imágenes (DICOM)" },
  ];

  const professionalLinks = [
    { to: "/dashboard/professional", icon: Stethoscope, label: "Mi Panel" },
    { to: "#agenda", icon: CalendarIcon, label: "Agenda Semanal" },
    { to: "/dashboard/interoperability", icon: Network, label: "Bus Interoperabilidad" },
    { to: "/dashboard/dicom", icon: FileText, label: "Visor DICOM" },
  ];

  const adminLinks = [
    { to: "/dashboard/admin", icon: LayoutDashboard, label: "Panel de Métricas" },
    { to: "/dashboard/interoperability", icon: Network, label: "Interoperabilidad HL7" },
    { to: "/dashboard/chatbot", icon: MessageCircle, label: "Automatizaciones WA" },
    { to: "/dashboard/dicom", icon: FileText, label: "Test Visor DICOM" },
  ];

  const links = isAdmin ? adminLinks : isProfessional ? professionalLinks : patientLinks;

  const getRoleTitle = () => {
    if (isAdmin) return "Panel de Administración";
    if (isProfessional) return "Panel del Profesional";
    return "Portal del Paciente";
  };

  const getInitials = () => {
    if (isAdmin) return "AD";
    if (isProfessional) return "DR";
    return "JD";
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-20 flex items-center px-6 border-b border-gray-200 cursor-pointer" onClick={() => navigate("/")}>
          <div className="flex items-center space-x-3">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Activity className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900 truncate">
              Salud Unificada
            </span>
          </div>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1">
          <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
            Menú Principal
          </div>
          {links.map((link) => (
            <NavLink
              key={link.label}
              to={link.to}
              className={({ isActive }) =>
                `flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                }`
              }
            >
              <link.icon className="mr-3 h-5 w-5 flex-shrink-0" />
              {link.label}
            </NavLink>
          ))}

          {/* Quick Demo Switcher - Just to show all roles for the presentation */}
          <div className="mt-12 pt-6 border-t border-gray-200">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 px-3">
              Cambiar Vista (Demo)
            </div>
            <NavLink to="/dashboard/patient" className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100">
              <User className="mr-3 h-4 w-4" /> Vista Paciente
            </NavLink>
            <NavLink to="/dashboard/professional" className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100">
              <Stethoscope className="mr-3 h-4 w-4" /> Vista Médico
            </NavLink>
            <NavLink to="/dashboard/admin" className="flex items-center px-3 py-2 text-sm font-medium rounded-xl text-gray-600 hover:bg-gray-100">
              <Settings className="mr-3 h-4 w-4" /> Vista Administrador
            </NavLink>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5" />
            Cerrar Sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-6 lg:px-8">
          <h1 className="text-xl font-semibold text-gray-800">
            {getRoleTitle()}
          </h1>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500 rounded-full hover:bg-gray-100 transition-colors">
              <Bell className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold border border-blue-200">
                {getInitials()}
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-slate-50/50 p-6 lg:p-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
