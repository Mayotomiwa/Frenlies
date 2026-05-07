import KVStore from "expo-sqlite/kv-store";

// expo-sqlite uses a single SQLite file. Concurrent async writes from different
// callers (Supabase auto-refresh, Zustand persist, etc.) trigger "database is
// locked". Serialising every operation through one promise chain fixes this —
// only one statement is in-flight at a time, and an error in one call never
// blocks subsequent ones (the second fn argument to .then handles that).
let tail: Promise<unknown> = Promise.resolve();

function serialized<T>(fn: () => Promise<T>): Promise<T> {
  const task = tail.then(fn, fn);
  tail = task.then(
    () => {},
    () => {},
  );
  return task;
}

export const serializedKVStore = {
  getItem: (key: string): Promise<string | null> =>
    serialized(() => KVStore.getItem(key)),
  setItem: (key: string, value: string): Promise<void> =>
    serialized(() => KVStore.setItem(key, value)),
  removeItem: (key: string): Promise<void> =>
    serialized(() => KVStore.removeItem(key)),
};
