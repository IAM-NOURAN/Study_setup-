import { useState } from 'react'

import './App.css'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/home.jsx';
import Tasks from './pages/tasks.jsx';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  )
}

export default App 
