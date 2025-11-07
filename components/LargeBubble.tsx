import React, { useState, useEffect } from 'react';
import { LargeBubble as LargeBubbleType } from '../types';

interface LargeBubbleProps {
  bubble: LargeBubbleType;
  onPop: (id: number, position: { x: number; y: number }) => void;
}

const LARGE_BUBBLE_LIFESPAN = 2000; // ms

export const LargeBubble: React.FC<LargeBubbleProps> = ({ bubble, onPop }) => {
  const [isPopped, setIsPopped] = useState(false);

  useEffect(() => {
    const popTimer = setTimeout(() => {
      setIsPopped(true);
      onPop(bubble.id, { x: bubble.x, y: bubble.y });
    }, LARGE_BUBBLE_LIFESPAN);

    return () => clearTimeout(popTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubble.id]);

  if (isPopped) {
    return (
      <div
        className="absolute"
        style={{
          left: `${bubble.x}%`,
          top: `${bubble.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <div
            className="explosion-ring"
            style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: bubble.color, animationDuration: '0.4s' }}
          />
          <div
            className="explosion-ring"
            style={{ width: '100%', height: '100%', borderWidth: '8px', borderColor: 'white', animationDelay: '0.1s', animationDuration: '0.4s' }}
          />
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute animate-pulse-bubble"
      style={{
        left: `${bubble.x}%`,
        top: `${bubble.y}%`,
        transform: 'translate(-50%, -50%)',
      }}
    >
      <div 
        className="w-20 h-20 sm:w-24 sm:h-24"
        style={{
            backgroundColor: bubble.color,
            border: `4px solid #1a1a1a`,
            boxShadow: `inset 0 0 0 2px #fff`,
        }}
      >
      </div>
    </div>
  );
};