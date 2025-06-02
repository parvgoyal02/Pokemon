import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Contact from './pages/Contact';
import Bookmark from './pages/Bookmark';
import PokeInfo from './components/PokeInfo';
import Navbar from './components/Navbar';
import LoginProvider from './context/logincontext';
import PokemonDetail from './pages/PokemonDetail';



function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bookmark" element={<Bookmark />} />
          {/* <Route path="/pokemon/:id" element={<PokeInfo />} /> */}
          <Route path="/pokemon/:name" element={<PokemonDetail />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
    
  )
}

export default App
