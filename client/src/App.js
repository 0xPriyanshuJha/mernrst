import React from 'react'
import {Route, Routes} from 'react-router-dom';
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
    <Route path="/about" element={<about />} />
    <Route path="/contact" element={<contact />} />
    <Route path="signup" element={<signup />} />
    <Route path="/login" element={<login />} />
</Routes>
      
      </>
  )
}


export default App