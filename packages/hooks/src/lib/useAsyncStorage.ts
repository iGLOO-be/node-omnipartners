import { useEffect, useState } from "react";

const AsyncStorage = typeof window !== "undefined" ? window.localStorage : null;

export const useAsyncStorage = <T>(
  key: string,
  defaultValue: T,
): [T, (newValue: T) => void, boolean] => {
  const [state, setState] = useState({
    synced: false,
    storageValue: defaultValue,
  });
  const { synced, storageValue } = state;

  async function pullFromStorage() {
    if (AsyncStorage) {
      const fromStorage = await AsyncStorage.getItem(key);
      let value = defaultValue;
      if (fromStorage) {
        value = JSON.parse(fromStorage);
      }
      setState({ synced: true, storageValue: value });
    }
  }

  async function updateStorage(newValue: T) {
    if (AsyncStorage) {
      setState({ synced: true, storageValue: newValue });
      const stringifiedValue = JSON.stringify(newValue);
      await AsyncStorage.setItem(key, stringifiedValue);
    }
  }

  useEffect(() => {
    pullFromStorage();
  }, []);

  return [storageValue, updateStorage, synced];
};
