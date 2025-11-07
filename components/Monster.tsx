
import React, { useState, useEffect } from 'react';
import { Monster as MonsterType } from '../types';
import { MonsterSprite } from './MonsterSprites';

interface MonsterProps {
  monster: MonsterType;
  onRemove: (id: number) => void;
}

const MONSTER_LIFESPAN = 2500; // ms

export const Monster: React.FC<MonsterProps> = ({ monster, onRemove }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in
    const fadeInTimer = setTimeout(() => {
      setIsVisible(true);
    }, 10); // Short delay to trigger transition

    // Schedule fade out and removal
    const fadeOutTimer = setTimeout(() => {
      setIsVisible(false);
    }, MONSTER_LIFESPAN - 500);

    const removeTimer = setTimeout(() => {
      onRemove(monster.id);
    }, MONSTER_LIFESPAN);

    return () => {
      clearTimeout(fadeInTimer);
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [monster.id]);

  return (
    <div
      className="absolute transition-all duration-500 ease-out"
      style={{
        left: `${monster.x}%`,
        top: `${monster.y}%`,
        transform: `translate(-50%, -50%) scale(${isVisible ? 1 : 0.5})`,
        opacity: isVisible ? 1 : 0,
      }}
    >
      <MonsterSprite type={monster.type} className="w-16 h-16 sm:w-20 sm:h-20" />
    </div>
  );
};
