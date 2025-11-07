import React, { useState, useEffect } from 'react';
import { Bubble as BubbleType } from '../types';

interface BubbleProps {
  bubble: BubbleType;
  onPop: (id: number, x: number, y: number) => void;
  travelDist: number;
}

export const Bubble: React.FC<BubbleProps> = ({ bubble, onPop, travelDist }) => {
  const [isRising, setIsRising] = useState(false);

  useEffect(() => {
    // Trigger the rise animation shortly after mounting
    const riseTimer = setTimeout(() => {
      setIsRising(true);
    }, 10);

    // Trigger the pop event at the end of its lifespan
    const popTimer = setTimeout(() => {
      onPop(bubble.id, bubble.x, 100 - travelDist);
    }, bubble.duration);

    return () => {
      clearTimeout(riseTimer);
      clearTimeout(popTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bubble.id]);

  return (
    <div
      className="absolute bottom-24 transition-transform ease-out"
      style={{
        left: `${bubble.x}%`,
        transform: `translateX(-50%) translateY(${isRising ? `-${(window.innerHeight * travelDist) / 100}px` : '0'})`,
        transitionDuration: `${bubble.duration}ms`,
      }}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-cyan-400/30 border-2 border-cyan-200/80 flex items-center justify-center animate-pulse">
        <div className="w-4 h-4 rounded-full bg-white/70 self-start mt-2 ml-4 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
};
