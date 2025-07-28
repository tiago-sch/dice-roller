import { useCallback, useState } from 'react';
import DiceRollsContext, { type DiceRollsContextType } from './DiceRollsContext';
import getRollValue from '../../utils/getRollValue';

const DiceRollsProvider = ({ children }: { children: React.ReactNode }) => {
  const [rolls, setRolls] = useState<DiceRollsContextType['rolls']>([]);

  const roll = useCallback<DiceRollsContextType['roll']>(value => {
    const rolled = getRollValue(value);

    setRolls(values => {
      values.push(rolled)
      return values;
    });
    return rolled;
  }, []);

  return (
    <DiceRollsContext.Provider value={{ rolls, roll }}>
      {children}
    </DiceRollsContext.Provider>
  );
}

export default DiceRollsProvider;