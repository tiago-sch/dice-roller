import { Fragment, type FormEvent, useRef } from 'react';
import useDiceRolls from '../../contexts/DiceRolls/useDiceRolls'

const RollInput = () => {
  const { currentRoll, roll } = useDiceRolls();
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredModifiers = currentRoll?.modifiers.filter(Boolean);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    /** 'else' ignored as input will be present on render */
    /* istanbul ignore else @preserve */
    if (inputRef.current) {
      const value = inputRef.current.value;
      inputRef.current.value = "";
      roll(value);
    }
  }

  return (
    <div className='h-[calc(100vh-64px)] flex justify-end flex-col p-6'>
      <div className="flex flex-1 text-center justify-center items-center">
        <div className="px-8 max-w-150">
          <p>
            {currentRoll ? (
              <span className="text-6xl bg-secondary py-4 px-16 inline-block rounded-lg block font-bold" data-testid="roll-input-result">
                {currentRoll?.rolled}
              </span>
            ) : (
              <span className="skeleton text-lg p-4 block">
                Roll your dice bellow
              </span>
            )}

            {currentRoll?.rolledValues && (
              <small className="block text-lg mt-5" data-testid="roll-input-result-details">
                {currentRoll.rolledValues.map((rolled, i) => {
                  const isLast = i+1 === currentRoll.rolledValues.length;
                  const showFinalComma = !isLast || (isLast && !!filteredModifiers?.length);
                  
                  return (
                    <Fragment key={`rollie-${rolled.die}-${i}`}>
                      <b>{rolled.die}</b>{' '}
                      (<span className={rolled.crit ? 'text-green-500' : rolled.fudge ? 'text-red-500' : ''} >
                        {rolled.rolledValue}
                      </span>)
                      {showFinalComma && ', '}
                    </Fragment>
                  )
                })}
                {filteredModifiers?.join(', ')}
              </small>
            )}
          </p>
        </div>
      </div>
      <form onSubmit={onSubmit} className="text-center" data-testid="roll-input-form">
        <input className="input input-xl" autoFocus placeholder="e.g.: 2d20+4" ref={inputRef} data-testid="roll-input" />
      </form>
    </div>
  )
}

export default RollInput;
