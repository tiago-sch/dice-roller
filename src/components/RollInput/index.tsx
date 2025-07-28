import { type FormEvent, useRef } from 'react';
import useDiceRolls from '../../contexts/DiceRolls/useDiceRolls'

const RollInput = () => {
  const { currentRoll, roll } = useDiceRolls();
  const inputRef = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputRef.current) {
      const value = inputRef.current.value;
      inputRef.current.value = "";
      roll(value);
    }
  }

  return (
    <div className='h-[calc(100vh-64px)] flex justify-end flex-col p-6'>
      <div className="flex flex-1 text-center justify-center items-center">
        <div>
          <p className={currentRoll ? 'text-5xl p-4' : 'skeleton text-lg p-4'} >
            {currentRoll ? currentRoll?.rolled : 'Roll your dice bellow'}
            {!!currentRoll?.rolledValues.length && (
              <small className="block text-lg">
                ({currentRoll.rolledValues.map(({die, rolledValue}) => `${die}: ${rolledValue}`).join(', ')})
              </small>
            )}
          </p>
        </div>
      </div>
      <form onSubmit={onSubmit} className='text-center'>
        <input className="input input-xl" autoFocus placeholder="e.g.: 2d20+4" ref={inputRef} />
      </form>
    </div>
  )
}

export default RollInput;
