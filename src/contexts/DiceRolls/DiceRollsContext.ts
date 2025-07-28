import { createContext } from 'react';
import { type RolledResult } from '../../utils/getRollValue/types';

export type DiceRollsContextType = {
  roll: (value: string) => void,
  currentRoll?: RolledResult,
  rolls: RolledResult[]
}

const DiceRollsContext = createContext<DiceRollsContextType>({
  roll: (value: string) => value,
  rolls: []
});

export default DiceRollsContext;