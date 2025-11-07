import React from 'react';

interface CandySpriteProps {
  color: string;
  className?: string;
}

export const CandySprite: React.FC<CandySpriteProps> = ({ color, className }) => {
    return (
        <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
            {/* Casing */}
            <path d="M7 6 H17 V18 H7 Z" fill="#7f8c8d" />
            <path d="M8 7 H16 V17 H8 Z" fill="#95a5a6" />
            
            {/* Top/Bottom Caps */}
            <path d="M7 6 H17 V7 H7 Z" fill="#34495e" />
            <path d="M7 17 H17 V18 H7 Z" fill="#34495e" />

            {/* Energy Core */}
            <path d="M10 8 H14 V16 H10 Z" fill={color} />
            <path d="M11 9 H13 V15 H11 Z" fill={shadeColor(color, 20)} />

             {/* Shine */}
            <path d="M8 7 H10 V8 H8 Z" fill="#ecf0f1" />
        </svg>
    );
};

// Helper to calculate a lighter/darker shade of a color
const shadeColor = (color: string, percent: number) => {
    let R = parseInt(color.substring(1,3),16);
    let G = parseInt(color.substring(3,5),16);
    let B = parseInt(color.substring(5,7),16);

    R = Math.floor(R * (100 + percent) / 100);
    G = Math.floor(G * (100 + percent) / 100);
    B = Math.floor(B * (100 + percent) / 100);

    R = (R<255)?R:255;  
    G = (G<255)?G:255;  
    B = (B<255)?B:255;  

    R = Math.max(0, R);
    G = Math.max(0, G);
    B = Math.max(0, B);

    const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
    const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
    const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

    return "#"+RR+GG+BB;
}