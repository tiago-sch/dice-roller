import { useContext } from 'react';
import DiceRollsContext from './DiceRollsContext';

const useDiceRolls = () => {
  const context = useContext(DiceRollsContext);

  return context;
}

export default useDiceRolls;