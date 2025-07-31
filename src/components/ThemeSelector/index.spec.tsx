import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ThemeSelector from '.'

describe('ThemeSelector', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it('should render without breaking', () => {
    render(<ThemeSelector />);

    expect(screen.getByTestId('theme-selector')).toBeInTheDocument()
  })

  it('should select value', async () => {
    const { rerender } = render(<ThemeSelector />);

    expect(screen.getByTestId('theme-selector')).toHaveValue('dark');
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
    
    await userEvent.selectOptions(screen.getByTestId('theme-selector'), 'aqua');
    rerender(<ThemeSelector />)
    
    expect(screen.getByTestId('theme-selector')).toHaveValue('aqua');
    expect(document.documentElement).toHaveAttribute('data-theme', 'aqua');
  })
});