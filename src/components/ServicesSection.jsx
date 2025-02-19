// src/components/ServicesSection.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // or HashLink if you want smooth scrolling
import { HashLink } from 'react-router-hash-link';

const ServicesSection = () => {
  return (
    <section
      id="services"
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '3rem',
        padding: '3rem',
      }}
    >
      {/* Card 1 */}
      <div
        style={{
          flex: '1',
          maxWidth: '300px',
          border: '1px solid #666',
          borderRadius: '8px',
          padding: '2.25rem',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Breaking the Chains
        </h3>
        <p style={{ margin: '1rem 0', fontSize: '1.125rem' }}>
          Read more about our motivation to bring advanced trading algorithms and AI market analysis to the public
        </p>
        <HashLink
          to="/about-us"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          Our Philosophy
        </HashLink>
      </div>

      {/* Card 2 */}
      <div
        style={{
          flex: '1',
          maxWidth: '300px',
          border: '1px solid #666',
          borderRadius: '8px',
          padding: '2.25rem',
        }}
      >
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
          Strategies for Success
        </h3>
        <p style={{ margin: '1rem 0', fontSize: '1.125rem' }}>
          View the list of indicators our programs use to identify optimal entry and exit signals for our high ROI strategy
        </p>

        {/* Change this link to point to the #how-it-works section on AboutUs */}
        <HashLink smooth to="/about-us#how-it-works"
          style={{
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          See now
          </HashLink>
      </div>
    </section>
  );
};

export default ServicesSection;
