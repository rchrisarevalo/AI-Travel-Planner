import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Housing from './components/housing';
import Landing from './components/Landing';
import GoogleMaps from './components/GoogleMaps';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/google_maps" element={<GoogleMaps />} />
        <Route path="/housing" element={<Housing />} />
      </Routes>
    </Router>
  )
}

export default App
