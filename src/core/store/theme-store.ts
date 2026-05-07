import { DEFAULT_THEME } from "@/src/shared/theme/constants";
import { Mode, Theme } from "@/src/shared/theme/types";
import { Appearance } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { serializedKVStore } from "./kv-store";

interface ThemeState {
  mode: Mode;
  systemTheme: boolean;
  _hasHydrated: boolean;

  toggleMode: () => void;
  setMode: (mode: Mode) => void;
  setSystemTheme: (system: boolean) => void;
  getActiveTheme: () => Theme;
  _setHasHydrated: (state: boolean) => void;
}

const getSystemMode = (): Mode => {
  const scheme = Appearance.getColorScheme();
  return scheme === "dark" ? "dark" : "light";
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      mode: "light" as Mode,
      systemTheme: false,
      _hasHydrated: false,

      toggleMode: () =>
        set((state) => ({
          mode: state.mode === "light" ? "dark" : "light",
          systemTheme: false,
        })),

      setMode: (mode) => set({ mode }),

      setSystemTheme: (system) => {
        if (system) {
          set({
            systemTheme: true,
            mode: getSystemMode(),
          });
        } else {
          set({ systemTheme: false });
        }
      },

      getActiveTheme: () => {
        const { mode } = get();
        return DEFAULT_THEME[mode];
      },

      _setHasHydrated: (state) => set({ _hasHydrated: state }),
    }),
    {
      name: "theme-storage",
      storage: createJSONStorage(() => serializedKVStore),
      partialize: (state) => ({
        mode: state.mode,
        systemTheme: state.systemTheme,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state._setHasHydrated(true);
          // If systemTheme is enabled, override the stored mode with the
          // actual current system scheme (the stored value can be stale).
          if (state.systemTheme) {
            state.setMode(getSystemMode());
          }
        }
      },
    },
  ),
);

// Hydration handling
let _resolveHydration: (() => void) | null = null;
const hydrationPromise = new Promise<void>((resolve) => {
  _resolveHydration = resolve;
});

useThemeStore.subscribe((state) => {
  if (state._hasHydrated && _resolveHydration) {
    _resolveHydration();
    _resolveHydration = null;
  }
});

export const waitForHydration = () => hydrationPromise;

// Listen to system theme changes dynamically
Appearance.addChangeListener(({ colorScheme }) => {
  const { systemTheme } = useThemeStore.getState();
  if (systemTheme) {
    useThemeStore.setState({
      mode: colorScheme === "dark" ? "dark" : "light",
    });
  }
});
