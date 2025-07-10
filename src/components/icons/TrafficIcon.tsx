
import React from 'react';

export const TrafficIcon: React.FC<{className?: string; style?: React.CSSProperties}> = ({ className, style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} style={style} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="10" rx="2" ry="2"></rect>
    <path d="M7 17v-4h10v4"></path>
    <path d="M2 12h20"></path>
    <path d="M6 7V5c0-1.1.9-2 2-2h8c1.1 0 2 .9 2 2v2"></path>
  </svg>
);
