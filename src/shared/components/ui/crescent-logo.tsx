import React from 'react';

interface CrescentSearchLogoProps {
  className?: string;
  size?: number;
  animated?: boolean;
}

export function CrescentSearchLogo({ 
  className = '', 
  size = 32,
  animated = false 
}: CrescentSearchLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Gradient for Crescent - Deep Blue to Purple */}
        <linearGradient id="crescentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4F46E5" stopOpacity="1" />
          <stop offset="50%" stopColor="#6366F1" stopOpacity="1" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="1" />
        </linearGradient>

        {/* Gradient for Handle - Darker depth */}
        <linearGradient id="handleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#4338CA" stopOpacity="1" />
          <stop offset="100%" stopColor="#5B21B6" stopOpacity="1" />
        </linearGradient>

        {/* Inner Glow for Crescent */}
        <radialGradient id="innerGlow" cx="30%" cy="30%">
          <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.6" />
          <stop offset="70%" stopColor="#818CF8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0" />
        </radialGradient>

        {/* Shadow Filter - Soft depth */}
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
          <feOffset dx="2" dy="3" result="offsetblur"/>
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.3"/>
          </feComponentTransfer>
          <feMerge>
            <feMergeNode/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>

        {/* Shine Effect Filter */}
        <filter id="shine" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Main Group with Animation */}
      <g className={animated ? 'animate-[pulse_3s_ease-in-out_infinite]' : ''}>
        {/* Outer Glow - Soft ambient light */}
        <circle
          cx="38"
          cy="38"
          r="32"
          fill="url(#innerGlow)"
          opacity="0.4"
          className="blur-sm"
        />

        {/* Crescent Shape (Hilal) - Main Lens */}
        <g filter="url(#softShadow)">
          {/* Base Crescent - Outer Circle */}
          <circle
            cx="38"
            cy="38"
            r="28"
            fill="url(#crescentGradient)"
          />
          
          {/* Inner Circle - Creates the crescent */}
          <circle
            cx="45"
            cy="38"
            r="23"
            fill="white"
          />

          {/* 3D Depth Ring - Inner edge shadow */}
          <circle
            cx="38"
            cy="38"
            r="27"
            fill="none"
            stroke="#312E81"
            strokeWidth="0.5"
            opacity="0.3"
          />

          {/* 3D Depth Ring - Outer highlight */}
          <circle
            cx="38"
            cy="38"
            r="28.5"
            fill="none"
            stroke="#A5B4FC"
            strokeWidth="0.8"
            opacity="0.4"
          />
        </g>

        {/* Shine Highlights on Crescent - 3D Glass Effect */}
        <g filter="url(#shine)">
          {/* Primary shine - Top left */}
          <ellipse
            cx="30"
            cy="28"
            rx="8"
            ry="6"
            fill="#FFFFFF"
            opacity="0.5"
            transform="rotate(-25 30 28)"
          />
          
          {/* Secondary shine - Smaller */}
          <circle
            cx="26"
            cy="34"
            r="3"
            fill="#EEF2FF"
            opacity="0.7"
          />

          {/* Tertiary shine - Accent */}
          <circle
            cx="35"
            cy="26"
            r="2"
            fill="#FFFFFF"
            opacity="0.8"
          />
        </g>

        {/* Magnifying Glass Handle - Premium Design */}
        <g filter="url(#softShadow)">
          {/* Handle Base - Thick professional line */}
          <line
            x1="58"
            y1="58"
            x2="84"
            y2="84"
            stroke="url(#handleGradient)"
            strokeWidth="10"
            strokeLinecap="round"
          />

          {/* Handle Inner Highlight - 3D effect */}
          <line
            x1="60"
            y1="60"
            x2="82"
            y2="82"
            stroke="#6366F1"
            strokeWidth="4"
            strokeLinecap="round"
            opacity="0.6"
          />

          {/* Handle Shadow Line - Depth */}
          <line
            x1="59"
            y1="59"
            x2="85"
            y2="85"
            stroke="#312E81"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.3"
          />
        </g>

        {/* Handle End Cap - Premium finish */}
        <g>
          {/* Outer cap - Base */}
          <circle
            cx="84"
            cy="84"
            r="7"
            fill="url(#handleGradient)"
            filter="url(#softShadow)"
          />
          
          {/* Inner cap - Highlight */}
          <circle
            cx="84"
            cy="84"
            r="5.5"
            fill="#4F46E5"
          />

          {/* Cap shine */}
          <circle
            cx="82"
            cy="82"
            r="2"
            fill="#A5B4FC"
            opacity="0.7"
          />

          {/* Cap border - Definition */}
          <circle
            cx="84"
            cy="84"
            r="7"
            fill="none"
            stroke="#312E81"
            strokeWidth="0.5"
            opacity="0.3"
          />
        </g>

        {/* Connection Point - Handle meets lens */}
        <g>
          {/* Shadow at connection */}
          <circle
            cx="55"
            cy="55"
            r="4"
            fill="#312E81"
            opacity="0.2"
          />
          
          {/* Connection highlight */}
          <circle
            cx="54"
            cy="54"
            r="2.5"
            fill="#6366F1"
            opacity="0.5"
          />
        </g>

        {/* Ambient Light Spots - Extra depth */}
        <circle
          cx="22"
          cy="24"
          r="1.5"
          fill="#FFFFFF"
          opacity="0.6"
          className="blur-[0.5px]"
        />
        <circle
          cx="28"
          cy="44"
          r="1"
          fill="#EEF2FF"
          opacity="0.5"
          className="blur-[0.5px]"
        />
      </g>
    </svg>
  );
}