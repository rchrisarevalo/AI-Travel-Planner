import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './App.css';
import './tailwind.css'
import Housing from './components/housing';
import Landing from './components/Landing';
import GoogleMaps from './components/GoogleMaps';
import Booking from './components/booking';

import ReactGA from 'react-ga';

const TRACKING_ID = import.meta.env._VITE_GA_TRACKING_ID

ReactGA.initialize(TRACKING_ID)

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/google_maps" element={<GoogleMaps />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/housing" element={<Housing />} />
      </Routes>
    </Router>
  )
}

export default App
