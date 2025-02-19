// src/pages/AboutUs.jsx

import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const AboutUs = () => {
  return (
    <div
      style={{
        minHeight: '100vh', // Full viewport height
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main
        style={{
          flex: 1, // Fill remaining space
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          gap: '2rem',
          padding: '4rem 2rem',
          // The parent container is 2900px wide at max.
          // If you want it even wider, change this or remove it.
          maxWidth: '2900px',
          margin: '0 auto',
        }}
      >
        {/* Left Column: All About Us + Roadmap Text */}
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>
            Taking Back Algorithmic Trading from Big Banks
          </h2>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            The Old System
          </h3>
          <p>
            For far too long, the power of financial markets has been concentrated in the hands of a few
            massive banking firms. These institutions have access to cutting-edge algorithmic trading
            bots—sophisticated tools that analyze data and execute trades at lightning speed, capturing
            profits from tiny market movements that retail investors never even see. These algorithms
            don’t sleep. They don’t hesitate. They relentlessly optimize profits, front-running human
            traders and extracting value from the system with ruthless efficiency.
          </p>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            Gatekept Technology
          </h3>
          <p>But here’s the catch: this technology is gatekept.</p>
          <p>
            Only the elite have access. The tools that generate billions for big banks are locked behind
            institutional walls. Ordinary people, retail traders, and small investors are left with
            outdated tools, fighting over scraps in inefficient markets. It’s not a level playing
            field—never has been. The system is designed that way. The few control the many because
            they have the tech, the infrastructure, and the speed.
          </p>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            Where Crypto and DeFi Come In
          </h3>
          <p>But that’s where crypto and DeFi come in.</p>
          <p>
            Decentralized finance is more than just a buzzword—it’s a revolution. With DeFi, we don’t
            have to wait for Wall Street to throw us a bone. We can build our own systems. Automated
            trading strategies that were once the exclusive domain of hedge funds and big banks? DeFi
            makes it possible for anyone, anywhere, to deploy similar bots—transparent, open-source,
            and accessible.
          </p>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            No More Closed-Door Deals
          </h3>
          <p>No more closed-door deals. No more financial elitism.</p>
          <p>
            Crypto trading bots, running on decentralized protocols, allow everyday investors to tap
            into algorithmic strategies that adapt to market conditions in real time. No middlemen.
            No gatekeepers. The efficiency and speed that banks paid millions for can now run on
            smart contracts, accessible to anyone with an internet connection.
          </p>

          <p>
            This isn’t just about profit—it’s about power. It’s about <em>taking back</em> control
            from institutions that profit from our exclusion. The traditional system relies on opacity;
            DeFi relies on transparency. The traditional system creates barriers; DeFi breaks them
            down. The traditional system extracts; DeFi empowers.
          </p>

          <h3 id="how-it-works" style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            How it works
          </h3>
          <p>Our AI analysis algorithm operates by capturing real-time snapshots of market price graphs and processing them through our proprietary AI models, specifically designed to predict future price changes. By analyzing patterns in price movements, volume fluctuations, and market sentiment indicators, the algorithm identifies key trends and correlations to generate accurate forecasts. This dynamic approach allows the algorithm to provide actionable insights and trading signals, empowering users to make data-driven decisions and stay ahead of market trends with precision and confidence.</p>
          
          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            The Tools Are Here
          </h3>
          <p>The tools are here. The technology is ready. The only question is:</p>
          <p style={{ fontWeight: 'bold', marginTop: '1rem' }}>
            Will you stay on the sidelines, or will you take back what’s always been kept from you?
          </p>

          {/* Separation line above the Roadmap header */}
          <hr
            style={{
              border: '0',
              borderTop: '1px solid #666',
              width: '90%',
              margin: '2rem auto',
            }}
          />

          {/* Roadmap Text */}
          <h2 id="roadmap" style={{ fontSize: '2rem', marginTop: '2rem', marginBottom: '1rem' }}>
            Our Roadmap
            </h2>
          <p>
            At Lucid, we are committed to revolutionizing the trading landscape by democratizing access
            to advanced financial tools. Our roadmap outlines the key milestones that will shape the
            future of our platform, guided by the principles of transparency, community governance, and
            cutting-edge technology.
          </p>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            Phase 1: Advanced Trading Algorithm Development
          </h3>
          <p>
            Our immediate focus is on the further enhancement of our proprietary trading algorithm. By
            incorporating sophisticated data analytics, machine learning techniques, and real-time
            market analysis, we aim to improve trading accuracy, adaptability, and performance. This
            upgraded algorithm will form the backbone of our trading ecosystem, offering optimized
            strategies tailored to diverse market conditions—empowering our community with tools
            typically reserved for institutional players.
          </p>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            Phase 2: Expansion of Crypto Offerings &amp; Trading Tools
          </h3>
          <p>
            Next, we will embark on the wider development of a diverse portfolio of coins, each designed
            to complement a variety of trading tools and strategies. This includes:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Staking Coins: Generate passive income by supporting the network.</li>
            <li>Yield Farming Tokens: Maximize returns through DeFi liquidity pools.</li>
            <li>Leverage Trading Assets: Amplify trading positions for experienced traders.</li>
            <li>Privacy-Focused Coins: Enhance transactional anonymity and security.</li>
            <li>
              Utility Tokens for Trading Tools: Access premium trading analytics, risk management
              dashboards, and custom algorithm deployment features.
            </li>
          </ul>
          <p>
            Every coin selection and tool integration will be decided through a community governance
            model, where holders of our native crypto token will have the power to vote and shape the
            platform’s evolution. This ensures that our development aligns with the collective interests
            of our ecosystem.
          </p>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            Phase 3: Deployment of Live Trading Bots
          </h3>
          <p>
            In the final phase, we will launch fully operational live trading bots, available for
            real-time deployment across supported exchanges. These bots will be powered by our refined
            algorithm and designed to execute complex trading strategies with precision and speed.
            Key features will include:
          </p>
          <ul style={{ marginLeft: '1.5rem', marginBottom: '1rem' }}>
            <li>Customizable Trading Strategies: Tailor bots to individual risk profiles.</li>
            <li>24/7 Automated Trading: Ensure continuous market participation.</li>
            <li>Backtesting &amp; Optimization Tools: Test strategies against historical data.</li>
            <li>Transparent Performance Metrics: Live dashboards to track bot performance.</li>
          </ul>
          <p>
            These bots will not only be accessible but also configurable by the community, unlocking
            institutional-grade trading capabilities for everyday traders.
          </p>

          <h3 style={{ fontSize: '1.5rem', margin: '1.5rem 0 1rem' }}>
            A Future Built by the Community, for the Community
          </h3>
          <p>
            Our roadmap is designed with a singular vision: to return financial power to the people.
            Through the strategic development of our trading algorithm, community-driven coin
            expansions, and the deployment of live trading bots, we are creating a trading ecosystem
            where accessibility, efficiency, and community governance are at the forefront.
          </p>
          <p>
            Together, with the support and direction of our token holders, we are set to redefine
            the future of trading—transparent, decentralized, and driven by innovation.
          </p>
        </div>

        {/* Right Column: Snaking Shapes + Thick Roadmap */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between', // shapes at top, roadmap at bottom
          }}
        >
          {/* Snaking shapes at the top */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}
          >
            {/* ... your shapes ... */}
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #bb86fc',
                backgroundColor: 'transparent',
                borderRadius: '0 50px 50px 0',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #cf6679',
                backgroundColor: 'transparent',
                borderRadius: '50px 0 0 50px',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #cf6679',
                backgroundColor: 'transparent',
                borderRadius: '0 50px 50px 0',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #bb86fc',
                backgroundColor: 'transparent',
                borderRadius: '50px 0 0 50px',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #bb86fc',
                backgroundColor: 'transparent',
                borderRadius: '0 50px 50px 0',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #cf6679',
                backgroundColor: 'transparent',
                borderRadius: '50px 0 0 50px',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #cf6679',
                backgroundColor: 'transparent',
                borderRadius: '0 50px 50px 0',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #bb86fc',
                backgroundColor: 'transparent',
                borderRadius: '50px 0 0 50px',
              }}
            />
            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #bb86fc',
                backgroundColor: 'transparent',
                borderRadius: '50px 0 0 50px',
              }}
            />

            <div
              style={{
                width: '100px',
                height: '100px',
                border: '2px solid #000',
                backgroundColor: 'transparent',
                borderRadius: '50px 0 0 50px',
              }}
            />
          </div>

          {/* THICK Roadmap at the bottom, now 800px tall */}
          <div style={{ marginTop: '2rem' }}>
            <svg
              width="200"
              height="800" // Increase length
              viewBox="0 0 200 800"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Very thick vertical line */}
              <line
                x1="60"
                y1="20"
                x2="60"
                y2="780"
                stroke="#fff"
                strokeWidth="2" // Thicker
              />

              {/* Phase 1 circle */}
  <circle cx="60" cy="120" r="20" fill="#bb86fc" />
  <text x="90" y="125" fill="#fff" fontSize="16" fontWeight="bold">
    Phase 1
  </text>
  {/* Subheading for Phase 1: multiple <tspan> for line breaks */}
  <text x="90" y="145" fill="#fff" fontSize="12">
    <tspan x="90" dy="0">Advanced Algo</tspan>
    <tspan x="90" dy="1.2em">Development</tspan>
  </text>

  {/* Phase 2 circle */}
  <circle cx="60" cy="400" r="20" fill="#cf6679" />
  <text x="90" y="405" fill="#fff" fontSize="16" fontWeight="bold">
    Phase 2
  </text>
  {/* Subheading for Phase 2 */}
  <text x="90" y="425" fill="#fff" fontSize="12">
    <tspan x="90" dy="0">Crypto Offerings</tspan>
    <tspan x="90" dy="1.2em">&amp; Trading Tools</tspan>
  </text>

  {/* Phase 3 circle */}
  <circle cx="60" cy="680" r="20" fill="#bb86fc" />
  <text x="90" y="685" fill="#fff" fontSize="16" fontWeight="bold">
    Phase 3
  </text>
  {/* Subheading for Phase 3 */}
  <text x="90" y="705" fill="#fff" fontSize="12">
    <tspan x="90" dy="0">Live Trading</tspan>
    <tspan x="90" dy="1.2em">Bots</tspan>
  </text>
            </svg>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
