import React, { useState, useEffect, forwardRef } from 'react';
import { Bubble as BubbleType } from '../types';

interface BubbleProps {
  bubble: BubbleType;
  onPop: (id: number, event: React.MouseEvent) => void;
  onRemove: (id: number) => void;
}

export const Bubble = forwardRef<HTMLDivElement, BubbleProps>(({ bubble, onPop, onRemove }, ref) => {
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
      ref={ref}
      onClick={handleClick}
      className="absolute bottom-24 transition-transform ease-out cursor-pointer"
      data-id={bubble.id}
      data-color={bubble.type === 'normal' ? bubble.color : ''}
      data-type={bubble.type}
      style={{
        left: `${bubble.x}%`,
        transform: `translateX(-50%) translateY(${isRising ? `-${(window.innerHeight * bubble.travelDist) / 100}px` : '0'}) scale(${isRising ? 1 : 0.2})`,
        transitionDuration: `${bubble.duration}ms`,
      }}
    >
      <div 
        className="w-12 h-12 sm:w-16 sm:h-16"
        style={{
            backgroundColor: bubble.color,
            border: `4px solid #1a1a1a`,
            boxShadow: `inset 0 0 0 1px #fff`,
        }}
      >
      </div>
    </div>
  );
});