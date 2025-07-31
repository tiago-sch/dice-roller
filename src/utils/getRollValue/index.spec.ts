import { describe, test, expect } from 'vitest'

import getRollValue, { isRollingDice } from './';

describe('getRollValue', () => {
  test('should return non-die value', () => {
    const result = getRollValue('20');

    expect(result.rolled).toBe(20);
    expect(result.rolledValues).toStrictEqual([]);
  });

  test('should return non-die negative value', () => {
    const result = getRollValue('20');

    expect(result.rolled).toBe(20);
    expect(result.rolledValues).toStrictEqual([]);
  });

  test('should return non-die value with modifiers', () => {
    const result = getRollValue('20+10');

    expect(result.rolled).toBe(30);
    expect(result.rolledValues).toStrictEqual([]);
  });

  test('should return non-die negative value with modifiers', () => {
    const result = getRollValue('20-10');

    expect(result.rolled).toBe(10);
    expect(result.rolledValues).toStrictEqual([]);
  });

  test('should return rolled die value', { repeats: 10 }, () => {
    const result = getRollValue('d20');

    expect(result.rolled).toBeGreaterThanOrEqual(1);
    expect(result.rolled).toBeLessThanOrEqual(20);
  });

  test('should return rolled die value with modifier', { repeats: 10 }, () => {
    const result = getRollValue('d20+4');

    expect(result.rolled).toBeGreaterThanOrEqual(5);
    expect(result.rolled).toBeLessThanOrEqual(24);
  });

  test('should return rolled dice value', { repeats: 10 }, () => {
    const result = getRollValue('2d20');

    expect(result.rolled).toBeGreaterThanOrEqual(2);
    expect(result.rolled).toBeLessThanOrEqual(40);
    expect(result.rolledValues).toHaveLength(2);
  });

  test('should return multiple rolled dice value', { repeats: 10 }, () => {
    const result = getRollValue('2d20+4d6');

    expect(result.rolled).toBeGreaterThanOrEqual(6);
    expect(result.rolled).toBeLessThanOrEqual(40+24);
    expect(result.rolledValues).toHaveLength(6);
  });

  test('should return multiple rolled dice value', { repeats: 10 }, () => {
    const result = getRollValue('2d20-d6');

    expect(result.rolled).toBeGreaterThanOrEqual(-5);
    expect(result.rolled).toBeLessThanOrEqual(40-1);
    expect(result.rolledValues).toHaveLength(3);
  });
});

describe('isRollingDice', () => {
  test('should return false for modifier only', () => {
    expect(isRollingDice('20')).toBeFalsy()
  })

  test('should return true for dice only', () => {
    expect(isRollingDice('d20')).toBeTruthy()
  })

  test('should return true for dice with modifier', () => {
    expect(isRollingDice('d20+20')).toBeTruthy()
  })
})