import { Theme, useAppContext } from "../../context/AppContext";

export type { Theme };

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export function useTheme() {
  const { theme, isDark, toggleTheme, setTheme } = useAppContext();
  return { theme, isDark, toggleTheme, setTheme };
}
