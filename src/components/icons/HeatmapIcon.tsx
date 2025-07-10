
import React from 'react';

export const HeatmapIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className}
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <circle cx="12" cy="12" r="3" opacity="0.5" fill="currentColor"/>
        <circle cx="17" cy="17" r="2" opacity="0.5" fill="currentColor"/>
        <circle cx="7" cy="7" r="2" opacity="0.5" fill="currentColor"/>
        <path d="M12 2L12 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M12 22L12 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M22 12L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        <path d="M2 12L2 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
);
