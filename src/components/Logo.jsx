import React from 'react';

/**
 * A single SVG that:
 * 1) Draws a capital L with a soft (rounded) 90° bend (both inner + outer corners).
 * 2) Nests a single quarter-circle shape inside the negative space of that L.
 * 
 * The overall SVG is 300×300, and the L shape occupies roughly the bottom-left corner.
 * Adjust numbers to taste!
 */

const LogoLWithQuarterCircle = () => {
  return (
    <svg
      width="300"
      height="300"
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/*
        ============== L SHAPE WITH ROUNDED INNER & OUTER CORNERS ==============
        
        We'll create an "outer rectangle" and "inner cutout" to form an L.
        - Outer boundary is the full 300×300, 
          but we only really use the bottom + left region.
        - We cut out a top-right region with a corner radius,
          so it leaves an L shape. We also round the outer corner.

        We'll use "fill-rule: evenodd" so the 'inner' path is subtracted.
      */}
      <path
        fillRule="evenodd"
        fill="#F9C8C8"
        d={`
          M 0,0 
          H 300
          V 300
          H 0
          Z

          /* OUTER CORNER (bottom-left of the L) with a radius */
          /* We'll define a big rectangle for the "L" bottom + left. 
             Then round the 90° corner at (80,220). */

          M 0,0
          V 300
          H 220
          A 20,20 0 0 1 240,280  /* Outer corner radius = 20 */
          V 200
          H 80
          A 20,20 0 0 1 60,180   /* Inside corner radius = 20 */
          V 0
          Z
        `}
      />

      {/*
        Explanation of the L path:
        - "M 0,0 -> V 300 -> H 220 -> A 20,20 0 0 1 240,280 -> V 200 -> H 80 -> A 20,20 0 0 1 60,180 -> V 0 -> Z"
        - Goes down the left edge, across the bottom, up with a 20px outer arc,
          then left, up with a 20px inner arc, forming an L.
        - Because of fillRule="evenodd" and the big "M 0,0 H300 V300 H0 Z" at top, 
          everything outside that path is subtracted, leaving an L shape.
      */}

      {/*
        ============== QUARTER-CIRCLE SHAPE (snaking shape) ==============
        
        We'll place a single quarter-circle inside the top-right negative space
        so it appears nested within the L. This is just one "snaking" shape 
        from your About page, oriented to match the letter's orientation.
      */}
      <path
        fill="#BB86FC"
        d={`
          M 240,0 
          H 300
          V 60
          A 60,60 0 0 1 240,0
          Z
        `}
      />

      {/*
        Explanation of the quarter-circle:
        - Start at (240,0), go right to (300,0), down to (300,60),
          then arc back to (240,0).
        - That arc "A 60,60 0 0 1 240,0" draws a quarter-circle of radius 60.
        - Adjust these coordinates if you want it placed differently inside the L.
      */}
    </svg>
  );
};

export default LogoLWithQuarterCircle;
