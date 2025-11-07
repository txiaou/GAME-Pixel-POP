import React, { useState, useCallback } from 'react';
import { Bubble as BubbleType, Monster as MonsterType, MonsterType as MonsterEnum } from './types';
import { Bubble } from './components/Bubble';
import { Monster } from './components/Monster';
import { BubbleMachine } from './components/BubbleMachine';

const App: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [monsters, setMonsters] = useState<MonsterType[]>([]);
  const [isShooting, setIsShooting] = useState(false);
  const [gingerCatCount, setGingerCatCount] = useState(0);

  const handleShoot = useCallback(() => {
    if (isShooting) return;

    setIsShooting(true);
    const newBubble: BubbleType = {
      id: Date.now(),
      x: 20 + Math.random() * 60, // Randomize horizontal position (20% to 80%)
      duration: 2000 + Math.random() * 2000, // Randomize speed (2s to 4s lifespan)
    };
    setBubbles((prev) => [...prev, newBubble]);

    setTimeout(() => {
      setIsShooting(false);
    }, 500); // Cooldown to prevent spamming
  }, [isShooting]);

  const handlePop = useCallback((bubbleId: number, event: React.MouseEvent) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));

    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    const monsterTypes = Object.values(MonsterEnum).filter(
      (v) => typeof v === 'number'
    ) as MonsterEnum[];
    const randomType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];

    if (randomType === MonsterEnum.Ginger) {
      setGingerCatCount((prevCount) => prevCount + 1);
    }

    const newMonster: MonsterType = {
      id: Date.now(),
      x,
      y,
      type: randomType,
    };
    setMonsters((prev) => [...prev, newMonster]);
  }, []);

  const handleRemoveBubble = useCallback((bubbleId: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
  }, []);

  const handleRemoveMonster = useCallback((monsterId: number) => {
    setMonsters((prev) => prev.filter((m) => m.id !== monsterId));
  }, []);

  return (
    <main className="relative w-screen h-screen overflow-hidden bg-gray-900 font-mono select-none">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjcyNzJhIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-white p-4 bg-black/30 rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-widest text-cyan-300">PIXEL POP</h1>
        <p className="text-sm sm:text-base text-gray-300">Click the bubbles to pop a surprise!</p>
      </div>

      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white p-4 bg-black/30 rounded-lg text-right">
        <h2 className="text-lg sm:text-xl font-bold tracking-wider text-amber-400">抓到黄色的猫猫</h2>
        <p className="text-4xl sm:text-5xl font-bold text-white mt-1">{gingerCatCount}</p>
      </div>

      {bubbles.map((bubble) => (
        <Bubble key={bubble.id} bubble={bubble} onPop={handlePop} onRemove={handleRemoveBubble} travelDist={75} />
      ))}
      {monsters.map((monster) => (
        <Monster key={monster.id} monster={monster} onRemove={handleRemoveMonster} />
      ))}

      <BubbleMachine isShooting={isShooting} />

      <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-10">
        <button
          onClick={handleShoot}
          disabled={isShooting}
          className={`px-8 py-4 text-xl font-bold text-white rounded-lg border-4 transition-all duration-200
            ${isShooting 
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
