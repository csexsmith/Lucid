// src/components/Header.jsx

import React, { useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo-modified.png'; // or wherever your logo is
import { HashLink } from 'react-router-hash-link';

const Header = () => {
  const [copied, setCopied] = useState(false);
  const coinAddress = '0x1234567890abcdef1234567890abcdef12345678';

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(coinAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  return (
    <NavigationMenu.Root
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0.5rem 2rem',
        borderBottom: '1px solid #666',
      }}
    >
      {/* Left side: Logo + Brand Name (clickable link to home) */}
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
        }}
      >
        <img
          src={logo}
          alt="Logo"
          style={{ marginRight: '0.5rem', width: '40px', height: '40px' }}
        />
        <strong style={{ fontSize: '1.5rem' }}>Lucid</strong>
      </Link>

      {/* Right side: Nav links */}
      <NavigationMenu.List
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: '2rem',
          margin: 0,
          padding: 0,
        }}
      >
        {/* Roadmap Link */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <HashLink smooth
              to="/about-us#roadmap"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Roadmap
            </HashLink>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Graph Page Link (new) */}
        <NavigationMenu.Item>
          <NavigationMenu.Link asChild>
            <Link
              to="/analysis"
              style={{
                textDecoration: 'none',
                color: 'inherit',
              }}
            >
              Trading Analysis
            </Link>
          </NavigationMenu.Link>
        </NavigationMenu.Item>

        {/* Copy Coin Address Button */}
        <NavigationMenu.Item>
          <button
            onClick={copyToClipboard}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '5px',
              border: '1px solid #3700b3',
              backgroundColor: 'transparent',
              fontSize: '1rem',
              cursor: 'pointer',
              color: '#007bff',
              transition: 'color 0.3s ease, border-color 0.3s ease',
              marginTop: '-0.5rem',
            }}
          >
            {copied ? 'Address Copied' : 'Coin Address'}
          </button>
        </NavigationMenu.Item>
      </NavigationMenu.List>
    </NavigationMenu.Root>
  );
};

export default Header;
