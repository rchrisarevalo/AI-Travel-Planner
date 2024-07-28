import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Loader from './components/Loader';
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Housing from './components/housing';
import Weather from './components/weather'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route path="/" element={<>
          <div>
            <a href="https://vitejs.dev" target="_blank">
              <img src={viteLogo} className="logo" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="logo react" alt="React logo" />
            </a>
          </div>
          <h1>Vite + React</h1>
          <Loader pending={true} error={false}>
            <p>This is something.</p>
          </Loader>
          <p className="read-the-docs">
            Click on the Vite and React logos to learn more
          </p>
        </>} />
        <Route path="/housing" element={<Housing />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  )
}

export default App
