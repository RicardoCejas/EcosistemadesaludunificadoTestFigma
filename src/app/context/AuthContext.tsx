import { AppRole, DemoView, useAppContext } from "../../context/AppContext";

export type { AppRole, DemoView };

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useAuth() {
  const { role, setRole, currentView, setCurrentView } = useAppContext();
  return { role, setRole, currentView, setCurrentView };
}
