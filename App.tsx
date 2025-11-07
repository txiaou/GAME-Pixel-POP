import React, { useState, useCallback } from 'react';
import { Bubble as BubbleType, Monster as MonsterType, MonsterType as MonsterEnum } from './types';
import { Bubble } from './components/Bubble';
import { Monster } from './components/Monster';
import { BubbleMachine } from './components/BubbleMachine';

type GameState = 'playing' | 'gameOver';

const LEVEL_UP_SCORE = 5;

const App: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [monsters, setMonsters] = useState<MonsterType[]>([]);
  const [isShooting, setIsShooting] = useState(false);
  const [gingerCatCount, setGingerCatCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('playing');
  const [isShaking, setIsShaking] = useState(false);

  const transitionToLevel2 = useCallback(() => {
    setLevel(2);
    setGingerCatCount(0);
    setBubbles([]);
    setMonsters([]);
  }, []);

  const handleShoot = useCallback(() => {
    if (isShooting || gameState !== 'playing') return;

    setIsShooting(true);

    const isBomb = level === 2 && Math.random() < 0.25; // 25% chance for a bomb in level 2

    const newBubble: BubbleType = {
      id: Date.now(),
      x: 20 + Math.random() * 60,
      duration: 2000 + Math.random() * 2000,
      type: isBomb ? 'bomb' : 'normal',
    };
    setBubbles((prev) => [...prev, newBubble]);

    setTimeout(() => {
      setIsShooting(false);
    }, 500);
  }, [isShooting, gameState, level]);

  const handlePop = useCallback((bubbleId: number, event: React.MouseEvent) => {
    const bubble = bubbles.find(b => b.id === bubbleId);
    if (!bubble) return;

    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));

    if (bubble.type === 'bomb') {
      setGameState('gameOver');
      setIsShaking(true);
      setBubbles([]); // Clear all bubbles on explosion
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    const monsterTypes = Object.values(MonsterEnum).filter(
      (v) => typeof v === 'number'
    ) as MonsterEnum[];
    const randomType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

    if (randomType === MonsterEnum.Ginger) {
      const newCount = gingerCatCount + 1;
      setGingerCatCount(newCount);
      if (level === 1 && newCount >= LEVEL_UP_SCORE) {
        transitionToLevel2();
      }
    }

    const newMonster: MonsterType = {
      id: Date.now(),
      x,
      y,
      type: randomType,
    };
    setMonsters((prev) => [...prev, newMonster]);
  }, [bubbles, gingerCatCount, level, transitionToLevel2]);

  const handleRemoveBubble = useCallback((bubbleId: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
  }, []);

  const handleRemoveMonster = useCallback((monsterId: number) => {
    setMonsters((prev) => prev.filter((m) => m.id !== monsterId));
  }, []);

  const handleRestart = () => {
    setGameState('playing');
    setGingerCatCount(0);
    setBubbles([]);
    setMonsters([]);
  };

  return (
    <main className={`relative w-screen h-screen overflow-hidden bg-gray-900 font-mono select-none ${isShaking ? 'animate-shake' : ''}`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjcyNzJhIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-white p-4 bg-black/30 rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-widest text-cyan-300">PIXEL POP</h1>
        <p className="text-sm sm:text-base text-gray-300">Level: {level}</p>
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white p-4 bg-black/30 rounded-lg text-right">
        <h2 className="text-lg sm:text-xl font-bold tracking-wider text-amber-400">抓到黄色的猫猫</h2>
        <p className="text-4xl sm:text-5xl font-bold text-white mt-1">
          {level === 1 ? `${gingerCatCount} / ${LEVEL_UP_SCORE}` : gingerCatCount}
        </p>
      </div>

      {gameState === 'playing' && bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} onPop={handlePop} onRemove={handleRemoveBubble} travelDist={75} />
      ))}
      {monsters.map((monster) => (
        <Monster key={monster.id} monster={monster} onRemove={handleRemoveMonster} />
      ))}

      {gameState === 'gameOver' && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
          <h2 className="text-7xl font-bold text-red-500 tracking-widest">GAME OVER</h2>
          <button
            onClick={handleRestart}
            className="mt-8 px-8 py-4 text-xl font-bold text-white rounded-lg border-4 transition-all duration-200 bg-blue-600 border-blue-500 hover:bg-blue-500 active:bg-blue-700"
          >
            重新开始
          </button>
        </div>
      )}

      <BubbleMachine isShooting={isShooting} />

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={handleShoot}
          disabled={isShooting || gameState !== 'playing'}
          className={`px-8 py-4 text-xl font-bold text-white rounded-lg border-4 transition-all duration-200
            ${isShooting || gameState !== 'playing'
              ? 'bg-gray-600 border-gray-500 cursor-not-allowed' 
              : 'bg-green-600 border-green-500 hover:bg-green-500 active:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300'
            }`}
        >
          {isShooting ? '...' : 'SHOOT'}
        </button>
      </div>
    </main>
  );
};

export default App;