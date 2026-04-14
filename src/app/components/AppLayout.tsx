import { Outlet, Link } from "react-router";
import { Activity, Moon, Sun } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function AppLayout() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 font-sans flex flex-col transition-colors">
      <header className="bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="bg-blue-600 p-2 rounded-lg group-hover:bg-blue-700 transition-colors">
                <Activity className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-slate-100 tracking-tight">
                Ecosistema de Salud Unificado
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="hidden sm:block text-sm text-gray-500 dark:text-slate-300 font-medium">Cruz del Eje, AR</span>
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
                aria-label="Alternar modo oscuro"
                title="Alternar modo oscuro"
              >
                {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <Link
                to="/login"
                className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Ingresar al Portal
              </Link>
            </div>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="bg-gray-900 dark:bg-black py-12 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-gray-400 dark:text-slate-400 gap-4">
          <div className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span className="font-semibold text-white">Salud Unificada Cruz del Eje</span>
          </div>
          <p className="text-sm">© 2026 Ecosistema de Salud. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
