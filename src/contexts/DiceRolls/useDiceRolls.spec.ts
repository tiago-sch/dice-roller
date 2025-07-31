import { renderHook } from '@testing-library/react'
import { afterEach, expect, describe, it } from 'vitest'
import useDiceRolls from './useDiceRolls'
import DiceRollsProvider from './DiceRollsProvider'

describe('useDiceRolls', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('should render without breaking', () => {
    const { result } = renderHook(() => useDiceRolls());

    expect(result.current.rolls).toHaveLength(0);
    expect(result.current.roll).toBeDefined();
    expect(result.current.roll('d20')).toBe('d20');
    expect(result.current.clearRolls).toBeDefined();
    expect(result.current.clearRolls()).toBeUndefined();
    expect(result.current.currentRoll).toBeUndefined();

  });

  it('should render without breaking', () => {
    const { result } = renderHook(
      () => useDiceRolls(),
      { wrapper: DiceRollsProvider }
    );

    expect(result.current.rolls).toHaveLength(0);
    expect(result.current.clearRolls).toBeDefined();
    expect(result.current.roll).toBeDefined();
    expect(result.current.currentRoll).toBeUndefined();
  });

  it('should roll dice setting current and history rolls', () => {
    const { result, rerender } = renderHook(
      () => useDiceRolls(),
      { wrapper: DiceRollsProvider }
    );

    expect(result.current.rolls).toHaveLength(0);
    expect(result.current.currentRoll).toBeUndefined();

    result.current.roll('d20');
    rerender();

    expect(result.current.currentRoll).toBeDefined();
    const { currentRoll } = result.current;
    expect(result.current.rolls).toHaveLength(1);
    expect(result.current.rolls[0]).toStrictEqual(currentRoll);
  });

  it('should roll dice and clear', () => {
    const { result, rerender } = renderHook(
      () => useDiceRolls(),
      { wrapper: DiceRollsProvider }
    );

    expect(result.current.rolls).toHaveLength(0);
    expect(result.current.currentRoll).toBeUndefined();

    result.current.roll('d20');
    rerender();

    expect(result.current.currentRoll).toBeDefined();
    const { currentRoll } = result.current;
    expect(result.current.rolls).toHaveLength(1);
    expect(result.current.rolls[0]).toStrictEqual(currentRoll);

    result.current.clearRolls();
    rerender();

    expect(result.current.currentRoll).toBeUndefined();
    expect(result.current.rolls).toHaveLength(0);
  });
});