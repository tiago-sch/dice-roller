export type UseLocalStorageSetter<T> = (newValue: T) => void;
export type UseLocalStorage = <T>(key: string, defaultValue: T) => [T, UseLocalStorageSetter<T>];