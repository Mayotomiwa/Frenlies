---
name: sheets-over-modals
description: >
  Enforces use of bottom sheets over modals in this Expo React Native project using Expo Router's
  presentation prop, via the shared `modal()` helper from `@/src/shared/global/modals/modal-section`.
  Always use this skill when deciding how to present overlay content, secondary screens, forms,
  pickers, confirmations, or any UI that floats above the main screen. Triggers on any mention of
  modal, bottom sheet, overlay, popup, dialog, drawer (sheet), or presenting a new screen on top
  of another.
---

# Sheets over Modals

Use bottom sheets via Expo Router's `presentation` prop wherever possible, configured through the
shared `modal()` helper.

**Only use a true modal if a sheet genuinely cannot satisfy the UX requirement.**

---

## The `modal()` helper

All sheet screens are configured through a single shared helper so theming, grabber visibility,
and header behaviour stay consistent across the app.

```tsx
// src/shared/global/modals/modal-section.ts
import { Theme } from "@/src/shared/theme/types";

export function modal(colors: Theme, detents: number[]) {
  return {
    presentation: "formSheet" as const,
    sheetGrabberVisible: true,
    headerShown: false,
    sheetAllowedDetents: detents,
    contentStyle: { backgroundColor: colors.modalBackground },
  };
}
```

Do **not** hand-roll `presentation: "formSheet"` configs in route files or `_layout.tsx`. Always
go through `modal()`.

---

## Sheet Pattern (Preferred)

### 1. Navigate to the sheet screen

```tsx
import { router } from "expo-router";

router.push({
  pathname: "/(modals)/some-sheet-screen",
  params: { id: item.id },
});
```

Or with a `<Link>`:

```tsx
import { Link } from "expo-router";

<Link
  href={{ pathname: "/(modals)/some-sheet-screen", params: { id: item.id } }}
>
  Open Sheet
</Link>;
```

### 2. Register the screen in `_layout.tsx` using `modal()`

```tsx
// app/_layout.tsx
import { modal } from "@/src/shared/global/modals/modal-section";
import { useTheme } from "@/src/shared/theme/hooks/use-themes";
import { Stack } from "expo-router";

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <Stack>
      {/* ...other screens... */}

      <Stack.Screen
        name="(modals)/journal-calendar"
        options={modal(colors, [0.58])}
      />
      <Stack.Screen
        name="(modals)/crisis-support"
        options={modal(colors, [0.85])}
      />
      <Stack.Screen name="(modals)/voice-call" options={modal(colors, [1.0])} />
    </Stack>
  );
}
```

The screen file itself just renders the feature — no `Stack.Screen` override needed:

```tsx
// app/(modals)/some-sheet-screen.tsx
import SomeSheetFeature from "@/src/features/some-sheet";

export default function SomeSheetScreen() {
  return <SomeSheetFeature />;
}
```

### Detent Options

Pass an array of fractions of the screen height to `modal()` as the second argument:

| Value              | Behaviour                           |
| ------------------ | ----------------------------------- |
| `[0.5]`            | Locked to half screen               |
| `[1.0]`            | Locked to full screen               |
| `[0.5, 1.0]`       | User can drag between half and full |
| `[0.25, 0.5, 1.0]` | Three snap points                   |

Pick the smallest detent that fits the content — taller sheets feel heavier than they need to.

---

## Modal (Fallback Only)

Only use a true modal when a sheet **genuinely cannot** satisfy the UX requirement (e.g.,
full-screen video player, complex multi-step wizard that must block the entire UI, or a screen
that needs a custom enter/exit animation the sheet presentation can't provide).

```tsx
<Stack.Screen
  name="(modals)/start-session"
  options={{
    presentation: "fullScreenModal",
    headerShown: false,
  }}
/>
```

If you find yourself reaching for `fullScreenModal` because you want a full-screen experience,
prefer `modal(colors, [1.0])` first — it gives you the same effective coverage with consistent
theming and a dismiss grabber.

---

## Decision Guide

| Use case                        | Use                             |
| ------------------------------- | ------------------------------- |
| Quick action / picker / confirm | `modal(colors, [0.5])`          |
| Detail view that can expand     | `modal(colors, [0.5, 1.0])`     |
| Full-screen form                | `modal(colors, [1.0])`          |
| Truly must block everything     | `fullScreenModal` (last resort) |

---

## Checklist

- [ ] Imported `modal` from `@/src/shared/global/modals/modal-section`
- [ ] Imported `useTheme` and pulled `colors` in `_layout.tsx`
- [ ] Passed detents as the smallest set that fits the content
- [ ] No hand-rolled `presentation: "formSheet"` configs
- [ ] `fullScreenModal` only used when a sheet genuinely won't work
