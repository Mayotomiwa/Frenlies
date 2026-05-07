---
name: typography-system
description: >
  Enforces use of the project typography system for all font sizes and weights in this Expo
  React Native app. Always use this skill when setting fontSize, fontFamily, fontWeight, or
  any text styling in StyleSheet or inline styles. Triggers on any mention of font size, font
  weight, text style, or typography. Never hardcode numeric font sizes or raw font strings —
  always use tokens from the typography constants file.
---

# Typography — Always Use the Typography System

Import and use `typography` from `src/shared/global/constants/typography.ts` for **all** font sizes and weights.

**Never** hardcode numeric font sizes or raw font family strings in component styles.

---

## Import

```tsx
import { typography } from "@/src/shared/global/constants/typography";
```

---

## Usage in StyleSheet

```tsx
const styles = StyleSheet.create({
  title: {
    fontSize: typography.fontSize["2xl"], // responsive 24
    fontFamily: typography.fontWeight.bold,
  },
  body: {
    fontSize: typography.fontSize.md, // responsive 16
    fontFamily: typography.fontWeight.regular,
  },
  caption: {
    fontSize: typography.fontSize.xs, // responsive 12
    fontFamily: typography.fontWeight.light,
  },
});
```

---

## Font Size Scale

| Token                        | Base value | Use for         |
| ---------------------------- | ---------- | --------------- |
| `typography.fontSize.xxxs`   | FRF(8)     | Micro labels    |
| `typography.fontSize.xxs`    | FRF(10)    | Badges, tags    |
| `typography.fontSize.xs`     | FRF(12)    | Captions, hints |
| `typography.fontSize.sm`     | FRF(14)    | Secondary text  |
| `typography.fontSize.md`     | FRF(16)    | Body / default  |
| `typography.fontSize.lg`     | FRF(18)    | Subheadings     |
| `typography.fontSize.xl`     | FRF(20)    | Section titles  |
| `typography.fontSize['2xl']` | FRF(24)    | Screen headings |
| `typography.fontSize['3xl']` | FRF(30)    | Hero text       |
| `typography.fontSize['4xl']` | FRF(36)    | Display text    |

---

## Font Weight Scale

| Token                             | Maps to        |
| --------------------------------- | -------------- |
| `typography.fontWeight.light`     | FONT_LIGHT     |
| `typography.fontWeight.regular`   | FONT_REGULAR   |
| `typography.fontWeight.medium`    | FONT_MEDIUM    |
| `typography.fontWeight.semibold`  | FONT_SEMIBOLD  |
| `typography.fontWeight.bold`      | FONT_BOLD      |
| `typography.fontWeight.extraBold` | FONT_EXTRABOLD |
| `typography.fontWeight.black`     | FONT_BLACK     |

---

## Important — Do NOT double-wrap FRF

All font size values already use `FRF()` (responsive font scaling) internally.  
**Do not** call `FRF()` again at the usage site — you will double-scale the value.

```tsx
// ✅ Correct
fontSize: typography.fontSize.md;

// ❌ Wrong — double-scaled
fontSize: FRF(typography.fontSize.md);
```

---

## ❌ Never do this

```tsx
// ❌ Hardcoded size
fontSize: 16;

// ❌ Raw font string
fontFamily: "Inter-Bold";

// ❌ Numeric weight (use fontFamily token instead)
fontWeight: "700";
```
