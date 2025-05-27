import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Signup from './components/Signup';
import Contact from './components/Contact';
import Bookmark from './components/Bookmark';
import PokeInfo from './components/PokeInfo';
import Navbar from './components/Navbar';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bookmark" element={<Bookmark />} />
        <Route path="/pokemon/:id" element={<PokeInfo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
