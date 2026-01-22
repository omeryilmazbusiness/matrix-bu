import React from 'react';

export function CrescentSearchLogo({ className = '', size = 32 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Crescent (Hilal) Shape - Magnifying Glass Lens */}
      <g transform="translate(10, 10)">
        {/* Outer circle of crescent */}
        <circle
          cx="30"
          cy="30"
          r="25"
          fill="currentColor"
          className="text-indigo-600"
        />
        {/* Inner circle to create crescent */}
        <circle
          cx="35"
          cy="30"
          r="20"
          fill="white"
        />
        {/* Shine effect on crescent */}
        <circle
          cx="22"
          cy="22"
          r="4"
          fill="currentColor"
          className="text-indigo-300"
          opacity="0.7"
        />
      </g>
      
      {/* Magnifying Glass Handle */}
      <line
        x1="55"
        y1="55"
        x2="75"
        y2="75"
        stroke="currentColor"
        strokeWidth="8"
        strokeLinecap="round"
        className="text-indigo-600"
      />
      
      {/* Handle end cap for depth */}
      <circle
        cx="75"
        cy="75"
        r="5"
        fill="currentColor"
        className="text-indigo-700"
      />
    </svg>
  );
}