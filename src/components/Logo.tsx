import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface LogoProps {
  className?: string;
  size?: number | string;
}

const Logo: React.FC<LogoProps> = ({ className = '', size = 200 }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Subtle flutter animation for the butterflies
      gsap.to('.butterfly', {
        y: 'random(-5, 5)',
        x: 'random(-5, 5)',
        rotation: 'random(-10, 10)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });
      
      // Wing flutter effect
      gsap.to('.wing-left', {
        scaleX: 0.5,
        duration: 0.15,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
      gsap.to('.wing-right', {
        scaleX: 0.5,
        duration: 0.15,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
        delay: 0.05
      });
    }, svgRef);

    return () => ctx.revert();
  }, []);

  return (
    <svg 
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 500 500" 
      width={size} 
      height={size} 
      className={`bg-white rounded-full ${className}`}
    >
      {/* Outer border */}
      <circle cx="250" cy="250" r="240" fill="none" stroke="#E53935" strokeWidth="4" />
      
      {/* Inner pink swoop */}
      <path 
        d="M 180 80 A 190 190 0 1 0 430 190" 
        fill="none" 
        stroke="#F06292" 
        strokeWidth="4" 
        strokeLinecap="round" 
      />

      {/* Main Center Box */}
      <g transform="translate(0, -10)">
        {/* Box outline */}
        <rect x="110" y="190" width="280" height="120" fill="white" stroke="#222" strokeWidth="3" />
        {/* Yellow bottom half */}
        <rect x="110" y="250" width="280" height="60" fill="#FFEB3B" stroke="#222" strokeWidth="3" />

        {/* Faces Line Art */}
        <g stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          {/* Male hairline */}
          <path d="M 110 240 Q 140 240 160 210 Q 180 190 220 190" />
          {/* Female hairline */}
          <path d="M 230 190 Q 280 190 310 210 Q 340 230 390 260" />
          
          {/* Male Profile */}
          <path d="M 220 190 C 210 220, 190 240, 180 270 L 190 280 L 185 290 L 190 310" />
          {/* Female Profile */}
          <path d="M 240 190 C 250 220, 270 240, 280 270 L 270 280 L 275 290 L 270 310" />
        </g>

        {/* Eyes */}
        <g stroke="#222" strokeWidth="3" fill="white">
          <path d="M 135 260 Q 155 245 175 260 Q 155 275 135 260 Z" />
          <path d="M 210 260 Q 230 245 250 260 Q 230 275 210 260 Z" />
          <path d="M 285 260 Q 305 245 325 260 Q 305 275 285 260 Z" />
        </g>

        {/* Pupils */}
        <g fill="#222">
          <circle cx="155" cy="260" r="6" />
          <circle cx="230" cy="260" r="6" />
          <circle cx="305" cy="260" r="6" />
        </g>
        {/* Eye highlights */}
        <g fill="white">
          <circle cx="153" cy="258" r="2" />
          <circle cx="228" cy="258" r="2" />
          <circle cx="303" cy="258" r="2" />
        </g>

        {/* Nose ring & Bindi */}
        <circle cx="285" cy="275" r="3" fill="none" stroke="#222" strokeWidth="2" />
        <circle cx="260" cy="230" r="6" fill="#F44336" />
      </g>

      {/* DREAM Text Box */}
      <g transform="translate(0, -10)">
        <rect x="110" y="310" width="280" height="50" fill="white" stroke="#222" strokeWidth="3" />
        
        {/* D - Magenta */}
        <path d="M 125 315 L 125 355 Q 165 355 165 335 Q 165 315 125 315 Z" fill="#E91E63" stroke="#222" strokeWidth="2" />
        
        {/* R - Green fill in bowl */}
        <line x1="180" y1="315" x2="180" y2="355" stroke="#222" strokeWidth="3" />
        <path d="M 180 315 H 200 Q 215 315 215 330 Q 215 340 200 340 H 180 Z" fill="#4CAF50" stroke="#222" strokeWidth="2" />
        <line x1="195" y1="340" x2="215" y2="355" stroke="#222" strokeWidth="3" />

        {/* E - Blue */}
        <polyline points="265,315 230,315 230,355 265,355" fill="none" stroke="#2196F3" strokeWidth="3" />
        <line x1="230" y1="335" x2="255" y2="335" stroke="#2196F3" strokeWidth="3" />

        {/* A - Red Triangle */}
        <polygon points="300,315 280,355 320,355" fill="#FFEB3B" stroke="#222" strokeWidth="2" />
        <polygon points="300,325 292,345 308,345" fill="white" stroke="#222" strokeWidth="2" />
        <polygon points="300,345 295,335 305,335" fill="#F44336" />

        {/* M - Black / Green */}
        <polygon points="335,355 335,315 355,335" fill="#222" stroke="#222" strokeWidth="2" />
        <polygon points="375,355 375,315 355,335" fill="#8BC34A" stroke="#222" strokeWidth="2" />
      </g>

      {/* MATRIMONY Text */}
      <text x="250" y="385" textAnchor="middle" fill="#E91E63" fontSize="30" fontFamily="sans-serif" letterSpacing="3" fontWeight="600">
        MATRIMONY
      </text>

      {/* Butterflies */}
      <g id="butterfly-top" className="butterfly" transform="translate(220, 80) scale(0.35) rotate(-15)">
        <g className="wing-right" style={{ transformOrigin: '0 0' }}>
          <path d="M 0 0 C 40 -60 100 -20 80 20 C 60 60 20 40 0 0" fill="#FF5722" stroke="#222" strokeWidth="4" />
          <path d="M 0 0 C 30 40 80 60 60 80 C 40 100 10 80 0 0" fill="#FFC107" stroke="#222" strokeWidth="4" />
          <circle cx="60" cy="-5" r="4" fill="white" />
          <circle cx="70" cy="15" r="3" fill="white" />
        </g>
        <g className="wing-left" style={{ transformOrigin: '0 0' }}>
          <path d="M 0 0 C -40 -60 -100 -20 -80 20 C -60 60 -20 40 0 0" fill="#FF5722" stroke="#222" strokeWidth="4" />
          <path d="M 0 0 C -30 40 -80 60 -60 80 C -40 100 -10 80 0 0" fill="#FFC107" stroke="#222" strokeWidth="4" />
          <circle cx="-60" cy="-5" r="4" fill="white" />
          <circle cx="-70" cy="15" r="3" fill="white" />
        </g>
        <rect x="-3" y="-25" width="6" height="60" rx="3" fill="#222" />
        <path d="M -1 -25 Q -15 -45 -25 -35" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
        <path d="M 1 -25 Q 15 -45 25 -35" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
      </g>

      <g id="butterfly-right" className="butterfly" transform="translate(380, 150) scale(0.3) rotate(35)">
        <g className="wing-right" style={{ transformOrigin: '0 0' }}>
          <path d="M 0 0 C 40 -60 100 -20 80 20 C 60 60 20 40 0 0" fill="#FF5722" stroke="#222" strokeWidth="4" />
          <path d="M 0 0 C 30 40 80 60 60 80 C 40 100 10 80 0 0" fill="#FFC107" stroke="#222" strokeWidth="4" />
          <circle cx="60" cy="-5" r="4" fill="white" />
          <circle cx="70" cy="15" r="3" fill="white" />
        </g>
        <g className="wing-left" style={{ transformOrigin: '0 0' }}>
          <path d="M 0 0 C -40 -60 -100 -20 -80 20 C -60 60 -20 40 0 0" fill="#FF5722" stroke="#222" strokeWidth="4" />
          <path d="M 0 0 C -30 40 -80 60 -60 80 C -40 100 -10 80 0 0" fill="#FFC107" stroke="#222" strokeWidth="4" />
          <circle cx="-60" cy="-5" r="4" fill="white" />
          <circle cx="-70" cy="15" r="3" fill="white" />
        </g>
        <rect x="-3" y="-25" width="6" height="60" rx="3" fill="#222" />
        <path d="M -1 -25 Q -15 -45 -25 -35" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
        <path d="M 1 -25 Q 15 -45 25 -35" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" />
      </g>
    </svg>
  );
};

export default Logo;
