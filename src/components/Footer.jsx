// src/components/Footer.jsx

import React from 'react';

const Footer = () => {
  return (
    <footer
      style={{
        padding: '3rem',
        textAlign: 'center',
        borderTop: '1px solid #666', // subtle border
      }}
    >
      <p style={{ margin: 0, fontSize: '1.125rem' }}>
        &copy; {new Date().getFullYear()} Lucid AI. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
