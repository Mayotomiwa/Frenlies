---
name: app-routing-only
description: >
  Enforces that the app/ directory is used for routing only in this Expo React Native project.
  Always use this skill when creating or editing any file inside the app/ directory, or when
  deciding where to place a new screen, component, hook, or piece of logic. Triggers on any
  mention of creating a new screen, adding logic to a route file, or placing components inside app/.
  All UI and business logic must live in src/features/.
---

# `/app` is Routing Only

The `app/` directory contains **only** route files. No business logic, no UI components, no helper functions.

---

## ✅ Allowed in `app/`

- Route file that imports and renders a feature screen
- `<Stack.Screen>` options configuration
- Layout files (`_layout.tsx`)

## ❌ Not Allowed in `app/`

- JSX beyond rendering the imported feature screen
- `useState`, `useEffect`, API calls, or any hooks with logic
- Inline styles or component definitions
- Helper functions or utilities

---

## The Pattern

### Route file (app/)

```tsx
// app/(tabs)/journal.tsx
import JournalScreen from "@/src/features/journal";
export default JournalScreen;
```

### With Stack.Screen options

```tsx
// app/(pages)/entry-detail.tsx
import { Stack } from "expo-router";
import EntryDetailScreen from "@/src/features/journal/entry-detail";

export default function EntryDetailRoute() {
  return (
    <>
      <Stack.Screen options={{ title: "Entry", headerShown: true }} />
      <EntryDetailScreen />
    </>
  );
}
```

### Feature screen (src/features/)

```tsx
// src/features/journal/index.tsx  ← all logic and UI lives here
import { useJournalEntries } from "@/src/core/query/use-journal-entries";

export default function JournalScreen() {
  const { data, isLoading } = useJournalEntries();
  // ... all the logic and UI
}
```

---

## Where Things Live

| What                 | Where                             |
| -------------------- | --------------------------------- | ------ | ----- | ------- |
| Screen UI + logic    | `src/features/<name>/index.tsx`   |
| Feature components   | `src/features/<name>/components/` |
| Shared UI components | `src/shared/global/components/`   |
| Zustand stores       | `src/core/store/`                 |
| React Query hooks    | `src/core/query/`                 |
| API services         | `src/core/api/services/`          |
| Route entry point    | `app/(tabs                        | drawer | pages | auth)/` |
