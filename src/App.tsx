import Navbar from './components/Navbar'
import RollInput from './components/RollInput'
import HistoryDrawer from './components/HistoryDrawer'
import DiceRollsProvider from './contexts/DiceRolls/DiceRollsProvider'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <DiceRollsProvider>
        <HistoryDrawer />
        <RollInput />
      </DiceRollsProvider>
    </>
  )
}

export default App
