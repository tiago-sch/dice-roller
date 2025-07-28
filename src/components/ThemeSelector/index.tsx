import { useEffect, useCallback, type ChangeEvent } from 'react'
import useLocalStorage from '../../utils/useLocalStorage'

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
  "dim",
  "nord",
  "sunset",
  "caramellatte",
  "abyss",
  "silk",
]

const ThemeSelector = () => {
  const [theme, setTheme] = useLocalStorage('theme', THEMES[1])

  useEffect(() => {
    const doc = document.querySelector('html');
    if (doc) {
      doc.dataset.theme = theme
    }
  }, [theme]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value),
    [setTheme]
  )

  return (
    <select value={theme} className="select" onChange={onChange}>
      {THEMES.map(item => (
        <option key={`theme-${item}-option`} value={item}>
          {item.toLocaleUpperCase()}
        </option>
      ))}
    </select>
  )
}

export default ThemeSelector;
