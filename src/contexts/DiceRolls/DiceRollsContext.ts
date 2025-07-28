import { createContext } from 'react';
import { type RolledResult } from '../../utils/getRollValue/types';

export type DiceRollsContextType = {
  roll: (value: string) => void,
  currentRoll?: RolledResult,
  rolls: RolledResult[],
  clearRolls: () => void;
}

const DiceRollsContext = createContext<DiceRollsContextType>({
  roll: (value: string) => value,
  rolls: [],
  clearRolls: () => {},
});

export default DiceRollsContext;