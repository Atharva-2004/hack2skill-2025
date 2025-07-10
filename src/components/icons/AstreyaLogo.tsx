import React from 'react';

export const AstreyaLogo: React.FC<{ className?: string, width?: string | number, height?: string | number }> = ({ className, width = "100%", height = "100%" }) => (
  <svg width={width} height={height} viewBox="0 0 100 85" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <g fill="#586877">
      {/* Map Base */}
      <path d="M15 85 L40 60 L60 80 L85 55 L85 85 Z" opacity="0.8"/>
      <path d="M15 85 L40 60 L15 60 Z" opacity="0.6"/>
      {/* Map Pin */}
      <path d="M50 0C35.67 0 24 11.67 24 26C24 45.42 50 65 50 65C50 65 76 45.42 76 26C76 11.67 64.33 0 50 0ZM50 35C45.03 35 41 30.97 41 26C41 21.03 45.03 17 50 17C54.97 17 59 21.03 59 26C59 30.97 54.97 35 50 35Z"/>
      {/* Cleaver inside pin circle, scaled and positioned */}
      <g transform="translate(42.5, 18.5) scale(0.25)">
          <path fill="#EAE8E4" d="M48.7,28.2H1.3c-0.7,0-1.3-0.6-1.3-1.3V7.3c0-0.7,0.6-1.3,1.3-1.3h20V1.3C21.3,0.6,21.9,0,22.7,0h4.7c0.7,0,1.3,0.6,1.3,1.3v4.7h20c0.7,0,1.3,0.6,1.3,1.3v19.7C50,27.6,49.4,28.2,48.7,28.2z M40,11.3c-0.7,0-1.3-0.6-1.3-1.3s0.6-1.3,1.3-1.3s1.3,0.6,1.3,1.3S40.7,11.3,40,11.3z"/>
      </g>
    </g>
  </svg>
);