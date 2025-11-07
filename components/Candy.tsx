import React, { useState, useEffect } from 'react';
import { Candy as CandyType } from '../types';
import { CandySprite } from './CandySprite';

interface CandyProps {
  candy: CandyType;
  onRemove: (id: number) => void;
}

const CANDY_LIFESPAN = 2500; // ms

export const Candy: React.FC<CandyProps> = ({ candy, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10);

    // Schedule fade out and removal
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, CANDY_LIFESPAN - 500);

    const removeTimer = setTimeout(() => {
      onRemove(candy.id);
    }, CANDY_LIFESPAN);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candy.id]);

  return (
    <div
      className="absolute transition-all duration-500 ease-out"
      style={{
        left: `${candy.x}%`,
        top: `${candy.y}%`,
        transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <CandySprite color={candy.color} className="w-12 h-12 sm:w-16 sm:h-16" />
    </div>
  );
};