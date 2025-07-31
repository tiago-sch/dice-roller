import { afterEach, describe, it, expect } from 'vitest'
import { renderHook } from '@testing-library/react'
import useLocalStorage from '.'

describe('useLocalStorage', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('should return default value if none', () => {
    const defaultValue = 'testvalue';
    const { result } = renderHook(() => useLocalStorage('test', defaultValue));

    expect(result.current[0]).toBe(defaultValue);
    expect(localStorage.getItem('test')).toBe(defaultValue);
  })

  it('should return default object like value if none', () => {
    const defaultValue = { a: 'testvalue' };
    const { result } = renderHook(() => useLocalStorage('test', defaultValue));

    expect(result.current[0]).toStrictEqual(defaultValue);
    expect(localStorage.getItem('test')).toBe(JSON.stringify(defaultValue));
  })

  it('should return local storage value', () => {
    const localStorageValue = 'localstoragevalue';
    const defaultValue = 'testvalue';

    localStorage.setItem('test', localStorageValue);
    const { result } = renderHook(() => useLocalStorage('test', defaultValue));

    expect(result.current[0]).toBe(localStorageValue);
    expect(localStorage.getItem('test')).toBe(localStorageValue);
  })

  it('should return local storage object like value', () => {
    const localStorageValue = { a: 'localstoragevalue' };
    const defaultValue = { a: 'testvalue' };

    localStorage.setItem('test', JSON.stringify(localStorageValue));
    const { result } = renderHook(() => useLocalStorage('test', defaultValue));

    expect(result.current[0]).toStrictEqual(localStorageValue);
    expect(localStorage.getItem('test')).toBe(JSON.stringify(localStorageValue));
  })

  it('should update value using the setter', () => {
    const defaultValue = 'testvalue';
    
    const { result, rerender } = renderHook(() => useLocalStorage('test', defaultValue));
    
    expect(result.current[0]).toBe(defaultValue);
    expect(localStorage.getItem('test')).toBe(defaultValue);
    
    const localStorageValue = 'localstoragevalue';
    result.current[1](localStorageValue);

    rerender()

    expect(result.current[0]).toBe(localStorageValue);
    expect(localStorage.getItem('test')).toBe(localStorageValue);
  })

  it('should update object like value using the setter', () => {
    const defaultValue = { a: 'testvalue' };
    
    const { result, rerender } = renderHook(() => useLocalStorage('test', defaultValue));
    
    expect(result.current[0]).toStrictEqual(defaultValue);
    expect(localStorage.getItem('test')).toBe(JSON.stringify(defaultValue));
    
    const localStorageValue = { a: 'localstoragevalue' };
    result.current[1](localStorageValue);

    rerender()

    expect(result.current[0]).toStrictEqual(localStorageValue);
    expect(localStorage.getItem('test')).toBe(JSON.stringify(localStorageValue));
  })

  it('should update local value through event effect', () => {
    const defaultValue = 'testvalue';
    
    const { result, rerender } = renderHook(() => useLocalStorage('test', defaultValue));
    
    expect(result.current[0]).toBe(defaultValue);
    expect(localStorage.getItem('test')).toBe(defaultValue);
    
    const localStorageValue = 'localstoragevalue';
    localStorage.setItem('test', localStorageValue);

    window.dispatchEvent(new Event('storage'));
    rerender()

    expect(result.current[0]).toBe(localStorageValue);
    expect(localStorage.getItem('test')).toBe(localStorageValue);
  })

  it('should not update local value through event effect if receiving same value', () => {
    const defaultValue = 'testvalue';
    
    const { result, rerender } = renderHook(() => useLocalStorage('test', defaultValue));
    
    expect(result.current[0]).toBe(defaultValue);
    expect(localStorage.getItem('test')).toBe(defaultValue);

    localStorage.setItem('test', defaultValue);
    window.dispatchEvent(new Event('storage'));
    rerender()

    expect(result.current[0]).toBe(defaultValue);
    expect(localStorage.getItem('test')).toBe(defaultValue);
  })
});