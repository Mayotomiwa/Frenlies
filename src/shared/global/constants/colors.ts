export const Colors = {
  main: {
    primary: "#3AE462", // Vivid green — logo, active nav, buttons, FAB, CTAs
    secondary: "#7B61FF", // Purple/indigo — chat bubbles, accents, hashtag links
  },

  semantic: {
    error: "#e53935", // Red — delete, leave room, destructive actions
    success: "#3AE462", // Green — positive indicators
    warning: "#FAC400", // Yellow/gold — audio room card accent
    info: "#7B61FF", // Purple — informational
  },

  neutral: {
    white: "#ffffff",
    dark: "#000000", // Pitch black
    black: "#1a1a1a", // Near-black used for headings/body text
    gray100: "#F7F8FA", // App background (very light gray)
    gray200: "#EAEDF0", // Card borders, dividers
    gray300: "#C8CDD4", // Inactive icons, placeholder text
    gray400: "#8C96A4", // Subtext, labels
    gray500: "#4A5568", // Secondary body text
  },

  accent: {
    purple: "#7B61FF", // Rich purple — received chat bubbles, primary accent
    purpleLight: "#EDE9FF", // Light purple — sent chat bubbles, address chips
    green: "#3AE462", // Brand green
    greenLight: "#E8FFF0", // Subtle green tint — backgrounds, layer tints
    yellow: "#FAC400", // Gold/yellow — audio room card variant
    darkGreen: "#1B4D38", // Dark green — audio room card variant
  },
};

export const Opacity = {
  5: "0D",
  10: "1A",
  15: "26",
  20: "33",
  25: "40",
  30: "4D",
  40: "66",
  50: "80",
  60: "99",
  70: "B3",
  80: "CC",
  90: "E6",
  100: "FF",
} as const;
