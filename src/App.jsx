// src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import GraphPage from './pages/GraphPage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />              {/* 🏠 Default Home Page */}
        <Route path="/about-us" element={<AboutUs />} />   {/* 📄 About Us Page */}
        <Route path="/analysis" element={<GraphPage />} />
      </Routes>
    </Router>
  );
}

export default App;
