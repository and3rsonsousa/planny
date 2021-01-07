import Cookie from "js-cookie";
import { useCallback, useState } from "react";

const storage = {};

// Safari in incognito has local storage, but size 0
// This system falls back to cookies in that situation
try {
  if (!window.localStorage) {
    throw Error("no local storage");
  }

  // Setup simple local storage wrapper
  storage.set = (key, value) =>
    localStorage.setItem(key, JSON.stringify(value));
  storage.get = (key) => {
    const item = localStorage.getItem(key);
    try {
      return JSON.parse(item);
    } catch (e) {
      return null;
    }
  };
  storage.remove = (key) => localStorage.removeItem(key);
} catch (e) {
  storage.set = Cookie.set;
  storage.get = Cookie.getJSON;
  storage.remove = Cookie.remove;
}

export default function useStorage(key) {
  const [state, setState] = useState(() => storage.get(key));

  const set = useCallback(
    (newValue) => {
      storage.set(key, newValue);
      setState(newValue);
    },
    [key]
  );

  const remove = useCallback(() => {
    storage.remove(key);
    setState(undefined);
  }, [key]);

  return [state, set, remove];
}
