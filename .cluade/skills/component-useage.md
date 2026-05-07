---
name: pressable-over-touchable
description: >
  Enforces use of Pressable instead of TouchableOpacity in this Expo React Native project.
  Always use this skill when writing any tappable/clickable UI element, button, list item,
  card, icon tap, or any other interactive element. Triggers on any mention of TouchableOpacity,
  TouchableHighlight, TouchableNativeFeedback, or any request to make something "tappable",
  "pressable", or "clickable" in this app.
---

# Pressable over TouchableOpacity

**Always** use `Pressable` (from `react-native`) for any tappable element.  
**Never** use `TouchableOpacity`, `TouchableHighlight`, or `TouchableNativeFeedback`.

## ✅ Correct

```tsx
import { Pressable } from "react-native";

<Pressable
  onPress={handlePress}
  style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
>
  <Text>Tap me</Text>
</Pressable>;
```

## ❌ Wrong

```tsx
import { TouchableOpacity } from "react-native";

<TouchableOpacity onPress={handlePress}>
  <Text>Tap me</Text>
</TouchableOpacity>;
```

## Why

`Pressable` is the modern, recommended API. It provides a richer pressed-state API via the render prop
`({ pressed }) => style`, supports `android_ripple`, and gives finer control over hit slop and press
retention. `TouchableOpacity` and friends are legacy wrappers that will eventually be deprecated.

## Pressed State Pattern

Use the function form of `style` to apply a visual feedback state:

```tsx
<Pressable
  onPress={onPress}
  style={({ pressed }) => [
    styles.container,
    pressed && styles.containerPressed,
  ]}
>
  {({ pressed }) => (
    <Text style={[styles.label, pressed && styles.labelPressed]}>{label}</Text>
  )}
</Pressable>
```
