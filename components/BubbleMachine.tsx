
import React from 'react';

interface BubbleMachineProps {
  isShooting: boolean;
}

export const BubbleMachine: React.FC<BubbleMachineProps> = ({ isShooting }) => {
  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-28 flex flex-col items-center">
      {/* Nozzle */}
      <div className="w-12 h-6 bg-gray-500 border-2 border-gray-400 rounded-t-md"></div>
      {/* Body */}
      <div className="w-36 h-24 bg-gray-700 border-4 border-gray-600 rounded-t-lg flex items-center justify-center">
        {isShooting && <div className="w-8 h-8 bg-cyan-400 rounded-full animate-ping opacity-50"></div>}
        <div className="absolute w-12 h-12 bg-cyan-500 rounded-full border-2 border-cyan-300"></div>
      </div>
    </div>
  );
};
