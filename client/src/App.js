import React from 'react'
import {Routes, Route} from 'react-router-dom';
import './App.css';
import Navbar from "./components/navbar";
import Home from './components/Home';
import About from './components/About';
import contact from './components/contact';
import login from './components/login';
import signup from './components/signup';

export const App = () => {
  return (
    <>
      <Navbar />

      <Routes>  
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/contact" element={<contact />} />
    <Route path="/login" element={<login />} />
    <Route path="signup" element={<signup />} />
</Routes>
      
      </>
  )
}


export default App