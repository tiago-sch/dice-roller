import Navbar from './components/Navbar'
import DiceRollsProvider from './contexts/DiceRolls/DiceRollsProvider'
import './App.css'

function App() {
  return (
    <>
      <Navbar />
      <DiceRollsProvider>
        <div></div>
      </DiceRollsProvider>
    </>
  )
}

export default App
