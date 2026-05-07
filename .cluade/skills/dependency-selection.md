---
name: dependency-selection
description: >
  Governs how to select and install any new library or package in this Expo React Native project.
  Always use this skill before installing any new dependency, recommending a library, or answering
  "what package should I use for X". Triggers on any mention of installing a package, adding a
  dependency, or comparing libraries. Do NOT skip — installing the wrong kind of package can break
  Expo Go compatibility.
---

# Dependency Selection Priority

When adding any new library, follow this **strict priority order**. Do not skip steps.

---

## Priority 1 — Expo SDK Package (PREFERRED)

Search [expo.dev/packages](https://expo.dev/packages) first.  
If an **Expo SDK package** exists (`expo-*`), use it — no further evaluation needed.

| Instead of                    | Use                |
| ----------------------------- | ------------------ |
| `react-native-fast-image`     | `expo-image`       |
| `react-native-camera`         | `expo-camera`      |
| `react-native-file-system`    | `expo-file-system` |
| `react-native-sqlite-storage` | `expo-sqlite`      |

---

## Priority 2 — Expo Go Compatible Library

If no Expo SDK package exists, find a library that is **explicitly compatible with Expo Go**.

Checklist:

- Is it listed as "Expo Go compatible" on its docs or expo.dev?
- Does it require a custom dev client or native build step? → If yes, it does NOT qualify here.

---

## Priority 3 — Maintenance Check (MANDATORY before installing)

Before installing any library from Priority 2, verify it is actively maintained:

- Check its GitHub repo: last commit date, open issues, README deprecation notices.

**Reject** any library that:

- Has not been updated in **12+ months**
- Is explicitly **deprecated or archived**
- Has a **successor** the maintainer recommends

If rejected, find the next best alternative and repeat this check.

---

## ⛔ Priority 4 — Neither Expo nor Expo Go Compatible: STOP

If the only viable library is **not** an Expo SDK package and **not** Expo Go compatible, **do not install it**.

Tell the user:

> "I need to use `[library-name]` for [reason], but it is not an Expo or Expo Go compatible package. Please review and confirm before I proceed."

**Wait for explicit user approval before continuing.**  
Do not proceed, do not suggest workarounds, do not install silently.

---

## Package Manager

Always use `bun` or `bunx expo install` — **never** `npm` or `yarn`.

```bash
# For Expo SDK packages
bunx expo install expo-image

# For third-party libraries
bun add some-library
```
