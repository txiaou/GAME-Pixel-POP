import React, { useState, useEffect } from 'react';
import { Bubble as BubbleType } from '../types';

interface BubbleProps {
  bubble: BubbleType;
  onPop: (id: number, event: React.MouseEvent) => void;
  onRemove: (id: number) => void;
  travelDist: number;
}

export const Bubble: React.FC<BubbleProps> = ({ bubble, onPop, onRemove, travelDist }) => {
  const [isRising, setIsRising] = useState(false);

  useEffect(() => {
    // Trigger the rise animation shortly after mounting
    const riseTimer = setTimeout(() => {
      setIsRising(true);
    }, 10);

    return () => {
      clearTimeout(riseTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onPop(bubble.id, event);
  };

  const handleTransitionEnd = () => {
    // When the bubble finishes its animation (reaches the top), remove it.
    onRemove(bubble.id);
  }

  return (
    <div
      onClick={handleClick}
      onTransitionEnd={handleTransitionEnd}
      className="absolute bottom-24 transition-transform ease-out cursor-pointer"
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
