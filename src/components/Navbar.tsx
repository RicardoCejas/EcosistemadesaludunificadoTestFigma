import { Activity, Bell, Menu, Moon, Search, Sun } from "lucide-react";

type NavbarProps = {
  title: string;
  initials: string;
  isDark: boolean;
  onToggleTheme: () => void;
  showMenuButton?: boolean;
  onMenuClick?: () => void;
};

export default function Navbar({ title, initials, isDark, onToggleTheme, showMenuButton = false, onMenuClick }: NavbarProps) {
  return (
    <header className="h-20 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700 flex items-center justify-between px-6 lg:px-8 transition-colors">
      <div className="flex items-center gap-4 min-w-0">
        {showMenuButton && (
          <button
            type="button"
            onClick={onMenuClick}
            className="md:hidden p-2 rounded-lg border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-slate-200 hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Abrir menú"
            title="Abrir menú"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        <div className="hidden lg:flex items-center gap-2 rounded-xl bg-blue-600 px-3 py-2">
          <Activity className="h-4 w-4 text-white" />
          <span className="text-xs font-semibold tracking-wide text-white">Salud Unificada</span>
        </div>
        <div className="hidden sm:flex items-center gap-2 rounded-xl border border-gray-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 px-3 py-2 text-sm w-[320px]">
          <Search className="h-4 w-4 text-gray-400 dark:text-slate-400" />
          <input
            type="text"
            placeholder="Buscar paciente, estudio o profesional..."
            className="w-full bg-transparent outline-none text-gray-700 dark:text-slate-100 placeholder:text-gray-400 dark:placeholder:text-slate-500"
          />
        </div>
        <h1 className="text-base sm:text-xl font-semibold text-gray-800 dark:text-slate-100 truncate">{title}</h1>
      </div>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          onClick={onToggleTheme}
          className="p-2 text-gray-500 dark:text-slate-200 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Alternar modo oscuro"
          title="Alternar modo oscuro"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>
        <button className="p-2 text-gray-400 dark:text-slate-300 hover:text-gray-500 rounded-full hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors">
          <Bell className="h-6 w-6" />
        </button>
        <div className="hidden sm:flex h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950/40 items-center justify-center text-blue-600 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
          {initials}
        </div>
        <div className="sm:hidden rounded-lg bg-blue-600 p-2">
          <Activity className="h-4 w-4 text-white" />
        </div>
      </div>
    </header>
  );
}
