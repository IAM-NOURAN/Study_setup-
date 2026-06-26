import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home.jsx';
import Tasks from './pages/tasks.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  )
}

export default App 
