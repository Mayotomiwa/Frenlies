---
name: flatlist-for-lists
description: >
  Enforces use of FlatList for any large or growing list in this Expo React Native project.
  Always use this skill when rendering lists, feeds, histories, search results, notifications,
  transactions, or any collection of items that could grow. Triggers on any mention of mapping
  over arrays to render UI, ScrollView with .map(), lists of any kind, or pagination. Do NOT
  use ScrollView + map for dynamic content — always use FlatList.
---

# FlatList for Large / Growing Lists

Use `FlatList` for **any** list that is large now **or could grow**.  
`ScrollView` is only for short, static content that will **never** paginate.

---

## ✅ Correct — Use FlatList

```tsx
import { FlatList } from "react-native";
// or from themed components:
import { FlatList } from "@/src/shared/global/components/ui/themed-components";

<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
/>;
```

## ❌ Wrong — ScrollView + map

```tsx
<ScrollView>
  {items.map((item) => (
    <ItemCard key={item.id} item={item} />
  ))}
</ScrollView>
```

---

## When to use FlatList

| Content type                      | Use                   |
| --------------------------------- | --------------------- |
| Transaction / history list        | `FlatList`            |
| Search results                    | `FlatList`            |
| Notifications feed                | `FlatList`            |
| Chat messages                     | `FlatList` (inverted) |
| Settings options (many)           | `FlatList`            |
| Dashboard cards (static, 3-4 max) | `ScrollView` ✅       |
| Onboarding steps (static)         | `ScrollView` ✅       |

---

## Common FlatList Patterns

### With separator

```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  ItemSeparatorComponent={() => <View style={styles.separator} />}
/>
```

### Inverted (chat / newest first)

```tsx
<FlatList
  data={messages}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <MessageBubble message={item} />}
  inverted
/>
```

### With empty state

```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  ListEmptyComponent={<EmptyState message="No items yet" />}
/>
```

### With header/footer

```tsx
<FlatList
  data={items}
  keyExtractor={(item) => item.id}
  renderItem={({ item }) => <ItemCard item={item} />}
  ListHeaderComponent={<SectionHeader title="Recent" />}
  ListFooterComponent={isLoading ? <ActivityIndicator /> : null}
/>
```

---

## Always Prefer Themed FlatList

Use the themed wrapper so theme colors and spacing are applied automatically:

```tsx
import { FlatList } from "@/src/shared/global/components/ui/themed-components";
```
