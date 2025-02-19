// src/Homepage.jsx

import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';

const Homepage = () => {
  return (
    // No inline color/background needed;
    // we rely on index.css for the dark background & white text
    <>
      <Header />
      <Hero />
      <ServicesSection />
      <Footer />
    </>
  );
};

export default Homepage;
