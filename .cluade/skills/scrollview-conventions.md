---
name: scrollview-conventions
description: >
  Governs correct ScrollView usage in this Expo React Native project. Always use this skill
  when adding a ScrollView to any screen or component. Triggers on any mention of ScrollView,
  scrollable content, safe area insets, or SafeAreaView wrapping a scroll container. Key rule:
  always set contentInsetAdjustmentBehavior="automatic" and never wrap ScrollView in SafeAreaView.
---

# ScrollView Conventions

Whenever `ScrollView` IS appropriate (short, static content that will never paginate), follow these rules.

---

## Rule 1 — Always set `contentInsetAdjustmentBehavior`

```tsx
import { ScrollView } from "react-native";
// or from themed components (preferred):
import { ScrollView } from "@/src/shared/global/components/ui/themed-components";

<ScrollView contentInsetAdjustmentBehavior="automatic">
  {/* content */}
</ScrollView>;
```

This handles safe-area insets (notch, home indicator, status bar) automatically.

---

## Rule 2 — Do NOT wrap in `SafeAreaView`

```tsx
// ❌ Wrong — redundant and can cause double insets
<SafeAreaView>
  <ScrollView>
    {/* content */}
  </ScrollView>
</SafeAreaView>

// ✅ Correct — contentInsetAdjustmentBehavior handles it
<ScrollView contentInsetAdjustmentBehavior="automatic">
  {/* content */}
</ScrollView>
```

---

## When ScrollView is appropriate

| Use case                                 | Correct component                         |
| ---------------------------------------- | ----------------------------------------- |
| Short static form (3-5 fields)           | `ScrollView` ✅                           |
| Settings screen (fixed options)          | `ScrollView` ✅                           |
| Onboarding / detail page (no pagination) | `ScrollView` ✅                           |
| List that could grow / paginate          | `FlatList` — see flatlist-for-lists skill |
| Feed, history, search results            | `FlatList` — see flatlist-for-lists skill |

---

## Horizontal ScrollView

Same rule applies:

```tsx
<ScrollView
  horizontal
  contentInsetAdjustmentBehavior="automatic"
  showsHorizontalScrollIndicator={false}
>
  {/* horizontal items */}
</ScrollView>
```

---

## Always Prefer Themed ScrollView

```tsx
import { ScrollView } from "@/src/shared/global/components/ui/themed-components";
```
