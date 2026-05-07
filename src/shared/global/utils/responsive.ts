import { Dimensions, PixelRatio } from "react-native";

// ─── Base Design Resolution ───────────────────────────────────────────────────
// Match these to your Figma/design canvas size.
// 390×844 = iPhone 14/15 (most common modern baseline)
const BASE_WIDTH = 390;
const BASE_HEIGHT = 844;

// ─── Screen Dimensions ────────────────────────────────────────────────────────
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// ─── Scale Ratios ─────────────────────────────────────────────────────────────
const widthRatio = SCREEN_WIDTH / BASE_WIDTH;
const heightRatio = SCREEN_HEIGHT / BASE_HEIGHT;

// ─── Internal helpers ─────────────────────────────────────────────────────────

/** Snap to the nearest physical pixel boundary for crispness */
const snap = (value: number) => PixelRatio.roundToNearestPixel(value);

/**
 * Divide out the system font scale so the OS's "large text" accessibility
 * setting does not inflate layout/font values you want to keep fixed.
 */
const ignoreFontScale = (value: number) => value / PixelRatio.getFontScale();

// ─── Public API ───────────────────────────────────────────────────────────────

export { SCREEN_HEIGHT, SCREEN_WIDTH };

/**
 * FRF – Fixed Responsive Font
 *
 * Scales a font size relative to the design canvas width, then locks it
 * against the OS text-size accessibility setting.
 */
export function FRF(size: number, factor = 0.5): number {
  const scaled = size + (size * widthRatio - size) * factor;
  return snap(ignoreFontScale(scaled));
}

/**
 * FW – Fixed Width
 *
 * Scales a dp width value proportionally to the screen width.
 * Compensates for system font scale so layout doesn't shift when the
 * user changes their OS text size.
 *
 * @example  FW(24)  // icon size, padding, margin
 */
export function FW(size: number): number {
  return snap(ignoreFontScale(size * widthRatio));
}

/**
 * FH – Fixed Height
 *
 * Scales a dp height value proportionally to the screen height.
 * Compensates for system font scale.
 *
 * @example  FH(56)  // button height, card height
 */
export function FH(size: number): number {
  return snap(ignoreFontScale(size * heightRatio));
}

/**
 * FWP – Fixed Width Percentage
 *
 * Returns a width as a percentage of the *actual* screen width,
 * then locks it against font scale changes.
 *
 * @example  FWP(100)  // full width
 * @example  FWP(50)   // half width
 */
export function FWP(percent: number): number {
  return snap(ignoreFontScale((SCREEN_WIDTH * percent) / 100));
}

/**
 * FHP – Fixed Height Percentage
 *
 * Returns a height as a percentage of the *actual* screen height,
 * then locks it against font scale changes.
 *
 * @example  FHP(100)  // full height
 * @example  FHP(25)   // quarter height
 */
export function FHP(percent: number): number {
  return snap(ignoreFontScale((SCREEN_HEIGHT * percent) / 100));
}

/**
 * FMS – Fixed Moderate Scale  (convenience alias for FRF)
 *
 * Identical to FRF but named after the familiar "moderateScale" concept
 * for teams coming from react-native-size-scaling.
 */
export const FMS = FRF;

/**
 * hairline
 *
 * The thinnest possible line on the device (1 physical pixel).
 * Use for dividers, borders — never scale this.
 */
export const hairline = 1 / PixelRatio.get();
