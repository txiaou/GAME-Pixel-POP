import React from 'react';

interface LevelSelectorProps {
  currentLevel: number;
  onSelectLevel: (level: number) => void;
  levels: number[];
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onSelectLevel, levels }) => {
  return (
    <div className="absolute top-1/2 -translate-y-1/2 left-4 sm:left-8 text-white p-4 bg-black/30 rounded-lg flex flex-col gap-2 z-10">
      <h2 className="text-lg sm:text-xl font-bold tracking-wider text-cyan-300 text-center mb-2">LEVELS</h2>
      {levels.map((level) => (
        <button
          key={level}
          onClick={() => onSelectLevel(level)}
          className={`px-4 py-2 text-base font-bold text-white rounded-lg border-2 transition-all duration-200
            ${currentLevel === level
              ? 'bg-cyan-600 border-cyan-500 cursor-default'
              : 'bg-gray-700 border-gray-600 hover:bg-gray-600'
            }`}
        >
          Level {level}
        </button>
      ))}
    </div>
  );
};
