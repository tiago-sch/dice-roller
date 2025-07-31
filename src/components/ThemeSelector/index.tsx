import { useEffect, useCallback, type ChangeEvent } from 'react'
import useLocalStorage from '../../utils/useLocalStorage'

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "emerald",
  "retro",
  "cyberpunk",
  "halloween",
  "forest",
  "aqua",
  "pastel",
  "fantasy",
  "luxury",
  "dracula",
  "autumn",
  "lemonade",
  "night",
  "coffee",
  "nord",
]

const ThemeSelector = () => {
  const [theme, setTheme] = useLocalStorage('theme', THEMES[1])

  useEffect(() => {
    const doc = document.documentElement;
    doc.dataset.theme = theme
  }, [theme]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value),
    [setTheme]
  )

  return (
    <select value={theme} className="select" data-testid="theme-selector" onChange={onChange}>
      {THEMES.map(item => (
        <option key={`theme-${item}-option`} data-testid={`theme-${item}-option`} value={item}>
          {item.toLocaleUpperCase()}
        </option>
      ))}
    </select>
  )
}

export default ThemeSelector;
