---
name: folder-pattern
description: >
  Governs where files must be placed in this Expo React Native project. Always use this skill
  when creating a new file, screen, component, hook, store, service, or any other file. Triggers
  on any request to create something new or move/restructure existing files. Do not create files
  outside the established pattern without confirming with the user.
---

# Folder Pattern — Where Files Live

Follow this structure strictly. **Do not create files outside the established pattern** without confirming with the user.

---

## Full Structure

```
app/                          ← ROUTING ONLY
  (tabs)/                     ← Bottom tab routes
    home.tsx
    journal.tsx
    ...
  (drawer)/                   ← Drawer routes (if needed)
  (auth)/                     ← Auth flow routes
  (pages)/                    ← Detail pages, sheet screens, deep links
  modal.tsx                   ← True modal
  <modal-name>.tsx

src/
  features/
    <feature-name>/
      index.tsx               ← Main screen export
      components/             ← Feature-specific components
    auth/
      log-in/
      sign-up/
      onboarding/

  shared/
    global/
      components/
        ui/
          themed-components.tsx  ← DO NOT bypass
      constants/
        colors.ts
        fonts.ts
        typography.ts
      utils/
        responsive.ts
        formatters.ts
    theme/
      hooks/
        use-themes.tsx

  core/
    store/                    ← Zustand stores
    query/                    ← React Query hooks
    mutation/                 ← React Query mutations
    cache/                    ← Query client config
    api/
      api-client.ts
      services/
```

---

## Placement Rules

| What you're creating         | Where it goes                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------- |
| New screen                   | `src/features/<name>/index.tsx` + route in `app/(tabs\|drawer\|pages\|auth)/` |
| Feature-only component       | `src/features/<name>/components/`                                             |
| Shared UI component          | `src/shared/global/components/`                                               |
| Zustand store                | `src/core/store/`                                                             |
| React Query hook (read)      | `src/core/query/`                                                             |
| React Query mutation (write) | `src/core/mutation/`                                                          |
| API service / endpoint       | `src/core/api/services/`                                                      |
| Design tokens                | `src/shared/global/constants/`                                                |
| Theme hook                   | `src/shared/theme/hooks/`                                                     |

---

## Decision Tree

```
Is it a route / page?
  → app/(tabs|drawer|pages|auth)/<name>.tsx  (routing only)
  → src/features/<name>/index.tsx  (all logic + UI)

Is it a UI component?
  → Used only in one feature?  →  src/features/<name>/components/
  → Used across multiple features?  →  src/shared/global/components/

Is it state?
  → Client/local state  →  src/core/store/  (Zustand)
  → Server/remote state  →  src/core/query/  (React Query)

Is it a network call?
  → src/core/api/services/
```
