import ThemeSelector from '../ThemeSelector'

const Navbar = () => {
  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">Dice Roller</a>
      </div>
      <div>
        <ThemeSelector />
      </div>
    </div>
  )
}

export default Navbar;
