import { FRF } from "../utils/responsive";
import {
    FONT_BLACK,
    FONT_BOLD,
    FONT_EXTRABOLD,
    FONT_LIGHT,
    FONT_MEDIUM,
    FONT_REGULAR,
    FONT_SEMIBOLD,
} from "./fonts";

/**
 * App typography system with fixed, responsive font sizes and weight
 */
export const typography = {
  fontSize: {
    xxxs: FRF(8),
    xxs: FRF(10),
    xs: FRF(12),
    sm: FRF(14),
    md: FRF(16),
    lg: FRF(18),
    xl: FRF(20),
    "2xl": FRF(24),
    "3xl": FRF(30),
    "4xl": FRF(36),
  },

  fontWeight: {
    light: FONT_LIGHT,
    regular: FONT_REGULAR,
    medium: FONT_MEDIUM,
    semibold: FONT_SEMIBOLD,
    bold: FONT_BOLD,
    extraBold: FONT_EXTRABOLD,
    black: FONT_BLACK,
  },
} as const;
