import { render, screen } from '@testing-library/react'
import DiceRollsProvider from '../../contexts/DiceRolls/DiceRollsProvider'
import HistoryDrawer from '.'

const MOCKED_ROLLS = [
  {"rolled":21,"rolledValues":[{"die":"d20","rolledValue":13,"crit":false,"fudge":false},{"die":"d20","rolledValue":8,"crit":false,"fudge":false}],"modifiers":[0],"prompt":"2d20","date":"2025-08-01T00:48:26.993Z"},
  {"rolled":28,"rolledValues":[{"die":"d10","rolledValue":10,"crit":true,"fudge":false},{"die":"d10","rolledValue":5,"crit":false,"fudge":false},{"die":"d10","rolledValue":9,"crit":false,"fudge":false}],"modifiers":[0,4],"prompt":"3d10+4","date":"2025-08-01T00:48:32.436Z"},
  {"rolled":3,"rolledValues":[{"die":"d2","rolledValue":2,"crit":true,"fudge":false},{"die":"d2","rolledValue":1,"crit":false,"fudge":true}],"modifiers":[0],"prompt":"2d2","date":"2025-08-01T00:48:37.464Z"}
];

describe('HistoryDrawer', () => {
  afterEach(() => {
    localStorage.clear()
  });

  it('should render without breaking', () => {
    render(<HistoryDrawer />, { wrapper: DiceRollsProvider });

    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Your future rolls will show up here')).toBeInTheDocument();
  });

  it('should render showing rolls', () => {
    localStorage.setItem('rolls', JSON.stringify(MOCKED_ROLLS));
    render(<HistoryDrawer />, { wrapper: DiceRollsProvider });

    expect(screen.getByText('History')).toBeInTheDocument();
    expect(screen.getByText('Clear Rolls')).toBeInTheDocument();
    const rollies = screen.getAllByTestId('rollie-result');
    expect(rollies).toHaveLength(3);
  });
});
