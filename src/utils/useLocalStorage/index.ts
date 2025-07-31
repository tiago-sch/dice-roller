import { useCallback, useEffect, useState } from 'react'
import { isEqual, isObject } from 'lodash'
import type { UseLocalStorageSetter, UseLocalStorage } from './types'

const useLocalStorage: UseLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const localData = localStorage.getItem(key);
    const firstValue = isObject(defaultValue) && localData ? JSON.parse(localData) : localData;

    if (!firstValue) {
      const defaultFormatted = isObject(defaultValue) ? JSON.stringify(defaultValue) : defaultValue;
      localStorage.setItem(key, defaultFormatted as string);
    }

    return firstValue || defaultValue;
  });

  const setStorage = useCallback<UseLocalStorageSetter<typeof defaultValue>>(newValue => {
    setValue(newValue);
    const formattedValue = isObject(newValue) ? JSON.stringify(newValue) : newValue
    localStorage.setItem(key, formattedValue as string);
  }, [key]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newValue = localStorage.getItem(key);
      const formattedValue = isObject(value) && newValue ? JSON.parse(newValue) : newValue
      if (!isEqual(formattedValue, value)) {
        setValue(formattedValue);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, value]);

  return [value, setStorage];
}

export default useLocalStorage;
