import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/counter'
import Accordion from './components/accordion'
import ProgressBarCreator from './components/progress-bar-creator'
import MemoryLeakDemo from './components/memory-leak-demo'
import MortgageCalculator from './components/mortgage-calculator'
import Tabs from './components/tabs'

function App() {

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        The list of components
      </p>
      <section className="components">
        <Tabs/>
        <MortgageCalculator />
        <MemoryLeakDemo />
        <ProgressBarCreator />
        <Accordion />
        <Counter />
      </section>

    </>
  )
}

export default App
