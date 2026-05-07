import { useThemeStore } from "@/src/core/store/theme-store";
import { DEFAULT_THEME } from "../constants";

/**
 * Hook to get the current theme and colors for your app
 * - Automatically reacts to mode changes
 * - Respects system theme setting if enabled
 */
export const useTheme = () => {
  const mode = useThemeStore((state) => state.mode);
  const systemTheme = useThemeStore((state) => state.systemTheme);
  const colors = DEFAULT_THEME[mode];

  return {
    mode,
    colors,
    systemTheme,
    theme: colors,
  };
};
