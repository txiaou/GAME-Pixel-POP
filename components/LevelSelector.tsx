import React from 'react';
import { GiftIcon } from './Icons';

interface LevelSelectorProps {
  currentLevel: number;
  onSelectLevel: (level: number) => void;
  levels: number[];
}

export const LevelSelector: React.FC<LevelSelectorProps> = ({ currentLevel, onSelectLevel, levels }) => {
  return (
    <div className="absolute top-20 left-2 flex flex-col gap-2 z-10">
      <div className="bg-zinc-700 p-2 border-2 border-zinc-600 cursor-pointer hover:bg-zinc-600">
        <GiftIcon className="w-8 h-8" />
      </div>
       <div className="bg-zinc-700 p-2 border-2 border-zinc-600 cursor-pointer hover:bg-zinc-600">
        <span className="text-yellow-400 text-3xl font-bold w-8 h-8 flex items-center justify-center">%</span>
      </div>
    </div>
  );
};