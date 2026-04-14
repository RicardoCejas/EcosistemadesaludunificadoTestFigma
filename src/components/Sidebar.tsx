import { AnimatePresence, motion } from "framer-motion";
import { Activity, Building2, Settings, Stethoscope, User } from "lucide-react";
import { NavLink, useNavigate } from "react-router";
import { DemoView } from "../context/AppContext";

type NavItem = {
  to: string;
  label: string;
};

type SidebarProps = {
  links: NavItem[];
  currentView: DemoView;
  onViewChange: (view: DemoView, destination: string) => void;
  onLogout: () => void;
};

const viewItems: Array<{ id: DemoView; label: string; icon: React.ComponentType<{ className?: string }>; destination: string }> = [
  { id: "paciente", label: "Vista Paciente", icon: User, destination: "/dashboard/patient" },
  { id: "medico", label: "Vista Medico", icon: Stethoscope, destination: "/dashboard/professional" },
  { id: "centro", label: "Vista Centro", icon: Building2, destination: "/dashboard/center" },
  { id: "admin", label: "Vista Administrador", icon: Settings, destination: "/dashboard/admin" },
];

export default function Sidebar({ links, currentView, onViewChange, onLogout }: SidebarProps) {
  const navigate = useNavigate();

  return (
    <aside className="w-64 bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 hidden md:flex flex-col transition-colors">
      <div
        className="h-20 flex items-center px-6 border-b border-gray-200 dark:border-slate-700 cursor-pointer"
        onClick={() => navigate("/")}
      >
        <div className="flex items-center space-x-3">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Activity className="h-5 w-5 text-white" />
          </div>
          <span className="text-lg font-bold text-gray-900 dark:text-slate-100 truncate">Salud Unificada</span>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-1">
        <div className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider mb-4 px-3">Menu Principal</div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="space-y-1"
          >
            {links.map((link) => (
              <NavLink
                key={link.label}
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center px-3 py-3 text-sm font-medium rounded-xl transition-colors ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 hover:text-gray-900 dark:hover:text-slate-100"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-6 border-t border-gray-200 dark:border-slate-700">
          <div className="text-xs font-bold text-gray-400 dark:text-slate-400 uppercase tracking-wider mb-4 px-3">
            Cambiar Vista (Demo)
          </div>
          {viewItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onViewChange(item.id, item.destination)}
              className={`flex w-full items-center gap-2 px-3 py-2 text-sm font-medium rounded-xl transition-colors ${
                currentView === item.id
                  ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                  : "text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
              }`}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200 dark:border-slate-700">
        <button
          onClick={onLogout}
          className="flex items-center w-full px-3 py-3 text-sm font-medium text-red-600 rounded-xl hover:bg-red-50 transition-colors"
        >
          Cerrar Sesion
        </button>
      </div>
    </aside>
  );
}
