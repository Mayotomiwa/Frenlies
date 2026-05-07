export type Mode = "light" | "dark";

export interface Theme {
  primary: string;
  secondary: string;
  [key: string]: string;
}

// light and dark theme variants for a tenant
export interface ThemeVariants {
  light: Theme;
  dark: Theme;
}
