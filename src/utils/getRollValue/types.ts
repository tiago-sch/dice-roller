export type RollDiceHelper = (value: number) => number;

export type RolledValue = {
  die: string,
  rolledValue: number,
  fudge?: boolean,
  crit?: boolean,
};

export type RolledResult =  {
  rolled: number,
  prompt: string,
  date: Date,
  rolledValues: RolledValue[],
  modifiers: number[]
};

export type GetRollValueHelper = (value: string) => RolledResult;