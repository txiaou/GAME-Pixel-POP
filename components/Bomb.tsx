import React, { useState, useEffect } from 'react';
import { Bomb as BombType } from '../types';

interface BombProps {
  bomb: BombType;
  onRemove: (id: number) => void;
}

const BOMB_LIFESPAN = 800; // ms

const BombIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M7 9H17V19H7V9Z" fill="#2c3e50"/>
        <path d="M8 10H16V18H8V10Z" fill="#34495e"/>
        <path d="M9 11H10V12H9V11Z" fill="#7f8c8d"/>
        
        <path d="M10 7H14V9H10V7Z" fill="#7f8c8d"/>
        <path d="M11 8H13V9H11V8Z" fill="#95a5a6"/>

        <path d="M14 6H15V8H14V6Z" fill="#bdc3c7"/>
        <path d="M15 5H16V7H15V5Z" fill="#f39c12"/>
        <path d="M16 4H17V6H16V4Z" fill="#e74c3c"/>
    </svg>
);


export const Bomb: React.FC<BombProps> = ({ bomb, onRemove }) => {
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const explosionTimer = setTimeout(() => setIsExploding(true), 100);
    const removeTimer = setTimeout(() => onRemove(bomb.id), BOMB_LIFESPAN);
    return () => {
      clearTimeout(explosionTimer);
      clearTimeout(removeTimer);
    };
  }, [bomb.id, onRemove]);

  return (
    <div
      className="absolute z-30"
      style={{
        left: `${bomb.x}%`,
        top: `${bomb.y}%`,
        transform: `translate(-50%, -50%)`,
      }}
    >
      {!isExploding && <BombIcon className="w-16 h-16 sm:w-20 sm:h-20" />}
      {isExploding && (
        <div className="relative w-16 h-16 sm:w-20 sm:h-20">
          <div className="explosion-ring" style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: '#f39c12' }} />
          <div className="explosion-ring" style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: '#e74c3c', animationDelay: '0.1s' }} />
          <div className="explosion-ring" style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: '#ecf0f1', animationDelay: '0.2s' }} />
        </div>
      )}
    </div>
  );
};