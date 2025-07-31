import { useCallback, useState } from 'react';
import DiceRollsContext, { type DiceRollsContextType } from './DiceRollsContext';
import getRollValue from '../../utils/getRollValue';
import useLocalStorage from '../../utils/useLocalStorage';
import { cloneDeep } from 'lodash';

const DiceRollsProvider = ({ children }: { children: React.ReactNode }) => {
  const [rolls, setRolls] = useLocalStorage('rolls', [] as DiceRollsContextType['rolls']);
  const [currentRoll, setCurrentRoll] = useState<DiceRollsContextType['currentRoll']>(); 

  const roll = useCallback<DiceRollsContextType['roll']>(value => {
    const rolled = getRollValue(value);

    setCurrentRoll(rolled);
    const newRolls = cloneDeep(rolls);
    newRolls.push(rolled);
    setRolls(newRolls);
    return rolled;
  }, [rolls, setRolls]);

  const clearRolls = useCallback(() => {
    setRolls([]);
    setCurrentRoll(undefined);
  }, [setRolls])

  return (
    <DiceRollsContext.Provider value={{ rolls, roll, currentRoll, clearRolls }}>
      {children}
    </DiceRollsContext.Provider>
  );
}

export default DiceRollsProvider;