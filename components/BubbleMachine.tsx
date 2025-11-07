import React from 'react';

interface BubbleMachineProps {
  isShooting: boolean;
}

export const BubbleMachine: React.FC<BubbleMachineProps> = ({ isShooting }) => {
  return (
    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 w-48 h-48 flex flex-col items-center">
       <svg viewBox="0 0 64 64" className="w-full h-full" style={{ shapeRendering: 'crispEdges' }}>
        {/* Base */}
        <path d="M12 52 H52 V58 H12 Z" fill="#34495e" />
        <path d="M14 53 H50 V57 H14 Z" fill="#2c3e50" />

        {/* Body */}
        <path d="M20 32 H44 V52 H20 Z" fill="#7f8c8d" />
        <path d="M22 34 H42 V50 H22 Z" fill="#95a5a6" />

        {/* Tank */}
        <path d="M26 36 H38 V48 H26 Z" fill="#2980b9" />
        <path d="M27 37 H37 V47 H27 Z" fill="#3498db" />
        <path d="M27 42 H37 V44 H27 Z" fill="#8be9fd" />


        {/* Nozzle */}
        <path d="M28 24 H36 V32 H28 Z" fill="#2c3e50" />
        <path d="M30 22 H34 V24 H30 Z" fill="#34495e" />
        <path d="M30 26 H34 V30 H30 Z" fill="#1a1a1a" className={`transition-transform duration-100 ${isShooting ? 'scale-y-90' : ''}`} style={{transformOrigin: 'bottom'}}/>


        {/* Wires */}
        <path d="M16 40 H20 V41 H16 Z" fill="#c0392b" />
        <path d="M16 42 H18 V43 H16 Z" fill="#c0392b" />
        <path d="M16 44 H20 V45 H16 Z" fill="#c0392b" />

        {/* Gauge */}
        <path d="M44 40 H48 V46 H44 Z" fill="#bdc3c7" />
        <path d="M45 41 H47 V45 H45 Z" fill="#2c3e50" />
        <path d="M45 44 H47 V45 H45 Z" fill="#e74c3c" />
      </svg>
    </div>
  );
};