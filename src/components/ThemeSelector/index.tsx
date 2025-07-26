import { useEffect, useCallback, useState, type ChangeEvent } from 'react'

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
  const [theme, setTheme] = useState(localStorage.getItem('theme') || THEMES[1])

  useEffect(() => {
    const doc = document.querySelector('html');
    if (doc) {
      doc.dataset.theme = theme
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => setTheme(e.target.value),
    [setTheme]
  )

  return (
    <select defaultValue={theme} className="select" onChange={onChange}>
      {THEMES.map(item => (
        <option key={`theme-${item}-option`} selected={theme === item} value={item}>
          {item.toLocaleUpperCase()}
        </option>
      ))}
    </select>
  )
}

export default ThemeSelector;
