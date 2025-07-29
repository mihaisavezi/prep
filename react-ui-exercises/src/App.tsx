import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Counter from './components/counter'
import Accordion from './components/accordion'
import ProgressBarCreator from './components/progress-bar-creator'
import MemoryLeakDemo from './components/memory-leak-demo'
import MortgageCalculator from './components/mortgage-calculator'
import Tabs from './components/tabs'
import BooleanDemo from './components/boolean-demo'
import { useEffect, useState } from 'react'
import Modal from './Modal'
import DataRow from './DataRow'

function App() {

  // before fetching, during fetching, after fetching
  // after fetching: 1) success 2) error
  const [response, setResponse] = useState({data: [], error: false});
  
  useEffect(() => {
    async function getData() {
      return await fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
    }
    
    getData().then((data) => setResponse((response) => ({...response, data})))
  }, [])

  
  

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
      {response?.data.length > 0 &&
        response?.data.map((entry) => (
          <DataRow key={entry.id} entry={entry}/>
        ))}
      <div className="hooks">
        <BooleanDemo />
      </div>
      <p className="read-the-docs">The list of components</p>
      <section className="components">
        <Tabs />
        <MortgageCalculator />
        <MemoryLeakDemo />
        <ProgressBarCreator />
        <Accordion />
        <Counter />
      </section>
    </>
  );
}

export default App
