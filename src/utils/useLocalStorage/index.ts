import { useCallback, useEffect, useState } from 'react'
import { isEqual, isObject } from 'lodash'

type UseLocalStorageSetter<T> = (newValue: T) => void;
type UseLocalStorage = <T>(key: string, defaultValue: T) => [T, UseLocalStorageSetter<T>];

const useLocalStorage: UseLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(() => {
    const localData = localStorage.getItem(key);
    const firstValue = isObject(defaultValue) && localData ? JSON.parse(localStorage.getItem(key) || '') : localStorage.getItem(key)
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
      const formattedValue = isObject(value) ? JSON.stringify(newValue) : newValue
      if (!isEqual(formattedValue, value)) {
        setValue(newValue);
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
