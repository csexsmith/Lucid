// src/components/Hero.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section style={{ padding: '4rem 1rem' }}>
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
          justifyContent: 'center',
        }}
      >
        {/* Left content: Heading + CTA */}
        <div style={{ textAlign: 'left' }}>
          <h1
            style={{
              fontSize: '3.75rem',
              lineHeight: '1.2',
              marginBottom: '1.5rem',
            }}
          >
            AI Trading Analysis
            <br />
            For The People
          </h1>

          {/* Replace the button with a Link to "/graph" */}
          <Link
            to="/analysis"
            style={{
              display: 'inline-block',
              padding: '1.125rem 2.25rem',
              fontSize: '1.5rem',
              border: '2px solid #3700b3',
              borderRadius: '9999px',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              color: '#3700b3',
              textDecoration: 'none',
            }}
          >
            Go to the app
          </Link>
        </div>

        {/* Right content: decorative shapes or globe, etc. */}
        <div
              style={{
                width: '300px',
                height: '300px',
                border: '2px solid #cf6679',
                backgroundColor: 'transparent',
                borderRadius: '50px 0 0 50px',
              }}
            />
      </div>
    </section>
  );
};

export default Hero;
