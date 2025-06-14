import { useState, useEffect } from "react";

export default function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);

      // Try to parse the stored JSON
      const parsed = item ? JSON.parse(item) : initialValue;

      // Ensure it matches the expected type (array, object, etc.)
      if (
        parsed &&
        typeof parsed === typeof initialValue &&
        (Array.isArray(initialValue) ? Array.isArray(parsed) : true)
      ) {
        return parsed;
      }

      // Fallback in case of invalid structure
      console.warn(
        `Invalid data for key "${key}" in localStorage, resetting...`
      );
      return initialValue;
    } catch (error) {
      console.warn(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Error writing to localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
