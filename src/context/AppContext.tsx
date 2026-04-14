import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type AppRole = "paciente" | "profesional" | "centro" | "admin";
export type DemoView = "paciente" | "medico" | "centro" | "admin";
export type Theme = "light" | "dark";

export type Appointment = {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  location: string;
  status: "Confirmado" | "Pendiente";
};

type AppContextValue = {
  role: AppRole | null;
  setRole: (role: AppRole | null) => void;
  currentView: DemoView;
  setCurrentView: (view: DemoView) => void;
  theme: Theme;
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Appointment) => void;
};

const ROLE_KEY = "salud-role";
const VIEW_KEY = "salud-demo-view";
const THEME_KEY = "salud-theme";
const APPOINTMENTS_KEY = "salud-appointments";

const AppContext = createContext<AppContextValue | undefined>(undefined);

function getFromStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) {
      return fallback;
    }
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }

  const stored = window.localStorage.getItem(THEME_KEY);
  if (stored === "dark" || stored === "light") {
    return stored;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<AppRole | null>(() => getFromStorage<AppRole | null>(ROLE_KEY, null));
  const [currentView, setCurrentViewState] = useState<DemoView>(() => getFromStorage<DemoView>(VIEW_KEY, "paciente"));
  const [theme, setThemeState] = useState<Theme>(getInitialTheme);
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    getFromStorage<Appointment[]>(APPOINTMENTS_KEY, []),
  );

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    window.localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(ROLE_KEY, JSON.stringify(role));
  }, [role]);

  useEffect(() => {
    window.localStorage.setItem(VIEW_KEY, JSON.stringify(currentView));
  }, [currentView]);

  useEffect(() => {
    window.localStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
  }, [appointments]);

  const setRole = (value: AppRole | null) => setRoleState(value);
  const setCurrentView = (value: DemoView) => setCurrentViewState(value);
  const setTheme = (value: Theme) => setThemeState(value);
  const toggleTheme = () => setThemeState((current) => (current === "dark" ? "light" : "dark"));

  const addAppointment = (appointment: Appointment) => {
    setAppointments((current) => [appointment, ...current]);
  };

  const value = useMemo(
    () => ({
      role,
      setRole,
      currentView,
      setCurrentView,
      theme,
      isDark: theme === "dark",
      toggleTheme,
      setTheme,
      appointments,
      addAppointment,
    }),
    [role, currentView, theme, appointments],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within AppProvider");
  }
  return context;
}
