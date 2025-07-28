import Navbar from './components/Navbar'
import RollInput from './components/RollInput'
import DiceRollsProvider from './contexts/DiceRolls/DiceRollsProvider'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <DiceRollsProvider>
        <RollInput />
      </DiceRollsProvider>
    </>
  )
}

export default App
