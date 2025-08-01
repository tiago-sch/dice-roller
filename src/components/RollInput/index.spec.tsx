import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import DiceRollsProvider from '../../contexts/DiceRolls/DiceRollsProvider'
import RollInput from '.'

describe('RollInput', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('should render without breaking', () => {
    render(<RollInput />, { wrapper: DiceRollsProvider })

    expect(screen.getByText('Roll your dice bellow')).toBeInTheDocument()
  })

  /** Repeat run 10 times due to d3 values */
  it.each(Array(10).fill(null))('should render with current roll', async () => {
    const { rerender } = render(<RollInput />, { wrapper: DiceRollsProvider })

    expect(screen.getByText('Roll your dice bellow')).toBeInTheDocument();
    expect(screen.queryByTestId("roll-input-result")).not.toBeInTheDocument();

    const input = screen.getByTestId("roll-input");
    await userEvent.type(input, "10d3");
    expect(screen.getByTestId("roll-input")).toHaveValue("10d3");    
    
    await userEvent.keyboard('{Enter}');
    rerender(<RollInput />);
    
    expect(screen.getByTestId("roll-input")).toHaveValue("");
    expect(screen.queryByText('Roll your dice bellow')).not.toBeInTheDocument();
    expect(screen.getByTestId("roll-input-result")).toBeInTheDocument();
    expect(screen.getByTestId("roll-input-result-details")).toBeInTheDocument();
  })
})