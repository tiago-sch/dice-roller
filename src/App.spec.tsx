import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('should render without breaking', () => {
    render(<App />);

    expect(screen.getByText('Dice Roller')).toBeInTheDocument()
  })
});