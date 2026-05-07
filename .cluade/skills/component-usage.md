---
name: themed-components
description: >
  Enforces use of the project's themed component library instead of raw React Native primitives
  in this Expo React Native app. Always use this skill when writing any UI component, screen,
  or layout. Triggers on any import from 'react-native' for Text, View, ScrollView, FlatList,
  SafeAreaView, or any request to build UI. Never import these primitives directly — always use
  the themed equivalents from themed-components.tsx and useTheme() for colors.
---

# Themed Components — Always Use Project UI Library

The project has a built-in themed component library at:  
`src/shared/global/components/ui/themed-components.tsx`

**Always prefer these over raw React Native primitives.**  
They automatically apply theme colors, typography, and spacing.

---

## Component Map

| Themed Component       | Replaces                    |
| ---------------------- | --------------------------- |
| `Text`                 | `RN.Text`                   |
| `Heading`              | `RN.Text` (heading variant) |
| `View`                 | `RN.View`                   |
| `SafeAreaView`         | `RN.SafeAreaView`           |
| `ScrollView`           | `RN.ScrollView`             |
| `FlatList`             | `RN.FlatList`               |
| `Button` / `AppButton` | `Pressable` + label         |
| `Card`                 | styled container `View`     |
| `Badge`                | status/tag pill             |
| `ThemedIcons`          | icon wrapper                |

---

## Import Pattern

```tsx
// ✅ Correct — use themed components
import {
  Text,
  View,
  Card,
  AppButton,
  ScrollView,
  FlatList,
  SafeAreaView,
  Heading,
  Badge,
} from "@/src/shared/global/components/ui/themed-components";

// ❌ Wrong — raw primitives bypass theming
import { Text, View, ScrollView } from "react-native";
```

---

## Using the Theme Hook

Always use `useTheme()` to access colors — **never** hardcode hex values or use raw constants directly in component styles.

```tsx
import { useTheme } from "@/src/shared/theme/hooks/use-themes";

const MyComponent = () => {
  const { colors } = useTheme();

  return (
    <View style={{ backgroundColor: colors.background }}>
      <Text style={{ color: colors.text }}>Hello</Text>
    </View>
  );
};
```

The theme responds to device appearance changes automatically.  
**Do not implement your own dark mode logic** — the theme system handles light/dark variants.

---

## Example Screen

```tsx
import {
  View,
  Text,
  Heading,
  Card,
  AppButton,
} from "@/src/shared/global/components/ui/themed-components";
import { useTheme } from "@/src/shared/theme/hooks/use-themes";

export default function ExampleScreen() {
  const { colors } = useTheme();

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <Heading>My Screen</Heading>
      <Card>
        <Text>Some content inside a card</Text>
      </Card>
      <AppButton onPress={() => {}} label="Confirm" />
    </View>
  );
}
```
