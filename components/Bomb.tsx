import React, { useState, useEffect } from 'react';
import { Bomb as BombType } from '../types';

interface BombProps {
  bomb: BombType;
  onRemove: (id: number) => void;
}

const BOMB_LIFESPAN = 800; // ms

const BombIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <path d="M5 9H11V10H5V9Z" fill="#222222"/>
        <path d="M4 10H12V12H4V10Z" fill="#222222"/>
        <path d="M5 12H11V13H5V12Z" fill="#222222"/>
        <path d="M7 8H9V9H7V8Z" fill="#222222"/>
        <path d="M6 5H7V6H6V5Z" fill="#888888"/>
        <path d="M7 4H8V5H7V4Z" fill="#888888"/>
        <path d="M8 3H9V4H8V3Z" fill="#888888"/>
        <path d="M9 2H10V3H9V2Z" fill="#FFD700"/>
        <path d="M6 10H7V11H6V10Z" fill="white"/>
    </svg>
);

export const Bomb: React.FC<BombProps> = ({ bomb, onRemove }) => {
  const [isExploding, setIsExploding] = useState(false);

  useEffect(() => {
    const explosionTimer = setTimeout(() => {
      setIsExploding(true);
    }, 100);

    const removeTimer = setTimeout(() => {
      onRemove(bomb.id);
    }, BOMB_LIFESPAN);

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
          <div
            className="explosion-ring"
            style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: '#fef08a' }}
          />
          <div
            className="explosion-ring"
            style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: '#fca5a5', animationDelay: '0.1s' }}
          />
            <div
            className="explosion-ring"
            style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: '#fdba74', animationDelay: '0.2s' }}
          />
        </div>
      )}
    </div>
  );
};