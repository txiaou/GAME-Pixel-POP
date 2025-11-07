import React, { useState, useEffect } from 'react';
import { Bubble as BubbleType } from '../types';

interface BubbleProps {
  bubble: BubbleType;
  onPop: (id: number, event: React.MouseEvent) => void;
  onRemove: (id: number) => void;
}

export const Bubble: React.FC<BubbleProps> = ({ bubble, onPop, onRemove }) => {
  const [isRising, setIsRising] = useState(false);

  useEffect(() => {
    // Trigger the rise animation shortly after mounting
    const riseTimer = setTimeout(() => {
      setIsRising(true);
    }, 10);
    
    // After rising and hovering, the bubble should be removed
    const hoverTime = 4000; // ms to hover
    const lifespan = bubble.duration + hoverTime;
    const removeTimer = setTimeout(() => {
        onRemove(bubble.id);
    }, lifespan);


    return () => {
      clearTimeout(riseTimer);
      clearTimeout(removeTimer);
    };
  }, [bubble, onRemove]);

  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    onPop(bubble.id, event);
  };

  return (
    <div
      onClick={handleClick}
      className="absolute bottom-24 transition-transform ease-out cursor-pointer"
      style={{
        left: `${bubble.x}%`,
        transform: `translateX(-50%) translateY(${isRising ? `-${(window.innerHeight * bubble.travelDist) / 100}px` : '0'})`,
        transitionDuration: `${bubble.duration}ms`,
      }}
    >
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center animate-pulse"
        style={{
            backgroundColor: `${bubble.color}4D`, // ~30% opacity
            borderColor: `${bubble.color}CC`, // ~80% opacity
            borderWidth: '2px',
            borderStyle: 'solid',
        }}
      >
        <div className="w-4 h-4 rounded-full bg-white/70 self-start mt-2 ml-4 transform -translate-x-1/2"></div>
      </div>
    </div>
  );
};
