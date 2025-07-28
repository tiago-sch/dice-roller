import { Fragment } from 'react';
import useDiceRolls from '../../contexts/DiceRolls/useDiceRolls';
import { format } from 'date-fns'

const HistoryDrawer = () => {
  const { rolls, clearRolls } = useDiceRolls();

  return (
    <div className="drawer drawer-end">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content fixed top-[50%] -right-4 rotate-90 -translate-y-1/2">
        <label htmlFor="my-drawer" className="btn btn-primary drawer-button">History</label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex gap-4 flex-col-reverse">
          {rolls.map((diceRoll, index) => {
            const filteredModifiers = diceRoll.modifiers.filter(Boolean);

            return (
              <li key={`${index}-${diceRoll.rolled}`}>
                <div className="stats shadow">
                  <div className="stat">
                    <div className="stat-title">{format(diceRoll.date, 'dd/MM/yyyy hh:mm (z)')}</div>
                    <div className="stat-value">{diceRoll.rolled}</div>
                    <div className="stat-desc">
                      <span className="block underline">{diceRoll.prompt}</span>
                      {diceRoll.rolledValues.map((rolled, i) => {
                        const isLast = i+1 === diceRoll.rolledValues.length;
                        const showFinalComma = !isLast || (isLast && !!filteredModifiers.length);
                        
                        return (
                          <Fragment key={`rollie-${rolled.die}-${index}`}>
                            <b>{rolled.die}</b>{' '}
                            (<span className={rolled.crit ? 'text-green-500' : rolled.fudge ? 'text-red-500' : ''} >
                              {rolled.rolledValue}
                            </span>)
                            {showFinalComma && ', '}
                          </Fragment>
                        )
                      })}
                      {filteredModifiers.join(', ')}
                    </div>
                  </div>
                </div>
              </li>
            )
          })}
          {rolls.length ? (
            <li className="text-center">
              <button className="btn btn-primary btn-sm" onClick={clearRolls}>Clear Rolls</button>
            </li>
          ) : (
            <li className="text-center text-lg flex-1 justify-center h-full">
              Your future rolls will show up here
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default HistoryDrawer;
