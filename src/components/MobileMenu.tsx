import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useLocation, useNavigate } from "react-router";
import { DemoView } from "../context/AppContext";

type NavItem = {
  to: string;
  label: string;
};

type MobileMenuProps = {
  open: boolean;
  links: NavItem[];
  currentView: DemoView;
  onClose: () => void;
  onViewChange: (view: DemoView, destination: string) => void;
  onLogout: () => void;
};

const viewItems: Array<{ id: DemoView; label: string; destination: string }> = [
  { id: "paciente", label: "Vista Paciente", destination: "/dashboard/patient" },
  { id: "medico", label: "Vista Medico", destination: "/dashboard/professional" },
  { id: "centro", label: "Vista Centro", destination: "/dashboard/center" },
  { id: "admin", label: "Vista Administrador", destination: "/dashboard/admin" },
];

export default function MobileMenu({ open, links, currentView, onClose, onViewChange, onLogout }: MobileMenuProps) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.button
            type="button"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/45 md:hidden"
            aria-label="Cerrar menú"
          />

          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="fixed left-0 top-0 z-50 h-full w-[86%] max-w-xs bg-white dark:bg-slate-900 border-r border-gray-200 dark:border-slate-700 p-4 md:hidden"
          >
            <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-slate-700">
              <h2 className="text-sm font-semibold text-gray-900 dark:text-slate-100">Navegación</h2>
              <button
                type="button"
                onClick={onClose}
                className="p-2 rounded-lg text-gray-500 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="pt-4 space-y-2">
              {links.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <button
                    key={link.label}
                    type="button"
                    onClick={() => {
                      navigate(link.to);
                      onClose();
                    }}
                    className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                      active
                        ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                        : "text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="mt-6 border-t border-gray-200 dark:border-slate-700 pt-4 space-y-2">
              <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-gray-400 dark:text-slate-400">Cambiar vista</p>
              {viewItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onViewChange(item.id, item.destination);
                    onClose();
                  }}
                  className={`w-full rounded-xl px-3 py-2 text-left text-sm font-medium transition-colors ${
                    currentView === item.id
                      ? "bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300"
                      : "text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="mt-6 w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 hover:bg-red-50"
            >
              Cerrar Sesion
            </button>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
