import { concat, forEach } from 'lodash';
import type { GetRollValueHelper, RolledValue, RollDiceHelper } from './types';

const diceWithCountRegex = /(\+|-)?([0-9]+)?[d]\d+/g;
const diceCountRegex = /(\+|-)?([0-9]+)?[d]/;
const diceRegex = /(\+|-)?[d]\d+/g;
const modifiersRegex = /[()+-]\d+(?![d])/g;
const firstStraightValue = /^([0-9]+)+(?:\+|-)/;
const onlyStraightValue = /^[+-]?\d+$/;

export const isRollingDice = (value: string) => diceRegex.test(value) || modifiersRegex.test(value);

const rollDice: RollDiceHelper = (sides) => Math.floor(Math.random() * sides) + 1;

const getRollValue: GetRollValueHelper = (value) => {
  let rolled = 0;
  const rolledValues: RolledValue[] = [];

  if (value.match(onlyStraightValue)) {
    return {
      rolled: parseFloat(value),
      rolledValues,
      modifiers: [],
    }
  }

  // First fixed value that is not a modifier (with signal)
  const firstValue = parseFloat(value.match(firstStraightValue)?.[0] || '0');
  rolled += firstValue;

  // All modifiers
  const mathModifiers = [...value.matchAll(modifiersRegex)].map(mod => parseInt(mod[0]));
  if (mathModifiers.length) {
    forEach(mathModifiers, modifier => rolled += modifier);
  };

  const modifiers = [firstValue, ...mathModifiers]

  // All dice with rolled value
  const allDice = [...value.matchAll(diceWithCountRegex)].map(die => die[0]);
  if (allDice.length) {
    let diceArray: string[] = [];

    forEach(allDice, die => {
      const dice = die.match(diceRegex)?.[0] || 'd20';
      const numOfDice = parseFloat(die.replace(dice, '')) || 1;
      const newDiceArray = Array.from(Array(numOfDice).keys()).map(() => dice);
      diceArray = concat(diceArray, newDiceArray);
    });

    forEach(diceArray, die => {
      const diceSides = parseFloat(die.match(diceRegex)?.[0].replace(diceCountRegex, '') || '20');
      const rolledValue = rollDice(diceSides);
      const isNegative = die.charAt(0) === '-';
      rolledValues.push({
        die: die.replace('+', ''),
        rolledValue,
        crit: rolledValue === diceSides,
        fudge: rolledValue === 1,
      });
      rolled += rolledValue * (isNegative ? -1 : 1);
    });
  }

  return {
    rolled,
    rolledValues,
    modifiers,
  };
};

export default getRollValue;