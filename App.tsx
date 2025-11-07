import React, { useState, useCallback, useEffect } from 'react';
import { Bubble as BubbleType, Monster as MonsterType, MonsterType as MonsterEnum, Bomb as BombType } from './types';
import { Bubble } from './components/Bubble';
import { Monster } from './components/Monster';
import { BubbleMachine } from './components/BubbleMachine';
import { Bomb } from './components/Bomb';
import { LevelSelector } from './components/LevelSelector';

type GameState = 'playing' | 'gameOver' | 'countdown';

const LEVEL_UP_SCORE = 5;
const AVAILABLE_LEVELS = [1, 2];
const BUBBLE_COLORS = ['#8be9fd', '#50fa7b', '#ffb86c', '#ff79c6', '#bd93f9']; // Cyan, Green, Orange, Pink, Purple

const App: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [monsters, setMonsters] = useState<MonsterType[]>([]);
  const [bombs, setBombs] = useState<BombType[]>([]);
  const [isShooting, setIsShooting] = useState(false);
  const [gingerCatCount, setGingerCatCount] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('countdown');
  const [isShaking, setIsShaking] = useState(false);
  const [countdownMessage, setCountdownMessage] = useState<string>('3');

  const selectLevel = useCallback((level: number) => {
    setLevel(level);
    setGingerCatCount(0);
    setBubbles([]);
    setMonsters([]);
    setBombs([]);
    setGameState('countdown');
    setIsShaking(false);
  }, []);

  const transitionToLevel2 = useCallback(() => {
    selectLevel(2);
  }, [selectLevel]);

  // Countdown logic
  useEffect(() => {
    if (gameState === 'countdown') {
      const messages = ['3', '2', '1', '祝你好运'];
      let messageIndex = 0;
      setCountdownMessage(messages[messageIndex]);

      const interval = setInterval(() => {
        messageIndex++;
        if (messageIndex < messages.length) {
          setCountdownMessage(messages[messageIndex]);
        } else {
          clearInterval(interval);
          setGameState('playing');
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [gameState]);
  
  // Automatic shooting logic
  useEffect(() => {
    if (gameState !== 'playing') return;

    const shootInterval = setInterval(() => {
      setIsShooting(true);
      setIsShaking(true);

      const bubbleCount = Math.floor(Math.random() * 2) + 1; // 1 or 2
      const newBubbles: BubbleType[] = [];

      for (let i = 0; i < bubbleCount; i++) {
          const isBomb = level === 2 && Math.random() < 0.20; // Bomb probability reduced to 20%
          const randomColor = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
          
          newBubbles.push({
              id: Date.now() + i,
              x: 30 + Math.random() * 40, // Spawn bubbles more centrally (30% to 70% of width)
              duration: 2000 + Math.random() * 2000,
              type: isBomb ? 'bomb' : 'normal',
              color: randomColor,
          });
      }
      
      setBubbles((prev) => [...prev, ...newBubbles]);

      setTimeout(() => {
          setIsShooting(false);
          setIsShaking(false);
      }, 400);

    }, 1500 + Math.random() * 1000); // Shoot every 1.5 - 2.5 seconds

    return () => clearInterval(shootInterval);
  }, [gameState, level]);


  const handlePop = useCallback((bubbleId: number, event: React.MouseEvent) => {
    const bubble = bubbles.find(b => b.id === bubbleId);
    if (!bubble) return;

    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
    
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;

    if (bubble.type === 'bomb') {
      const newBomb: BombType = { id: Date.now(), x, y };
      setBombs((prev) => [...prev, newBomb]);
      setGameState('gameOver');
      setIsShaking(true);
      setBubbles([]); // Clear all bubbles on explosion
      setTimeout(() => setIsShaking(false), 600); // Match shake animation duration
      return;
    }

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

  const handleRemoveBomb = useCallback((bombId: number) => {
    setBombs((prev) => prev.filter((b) => b.id !== bombId));
  }, []);

  const handleRestart = () => {
    selectLevel(level);
  };

  return (
    <main className={`relative w-screen h-screen overflow-hidden bg-gray-900 font-mono select-none ${isShaking ? 'animate-shake' : ''}`}>
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjMjcyNzJhIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>
      
      <div className="absolute top-4 left-4 sm:top-8 sm:left-8 text-white p-4 bg-black/30 rounded-lg">
        <h1 className="text-2xl sm:text-4xl font-bold tracking-widest text-cyan-300">PIXEL POP</h1>
        <p className="text-sm sm:text-base text-gray-300">Level: {level}</p>
      </div>

      <LevelSelector 
        currentLevel={level}
        onSelectLevel={selectLevel}
        levels={AVAILABLE_LEVELS}
      />

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
      {bombs.map((bomb) => (
        <Bomb key={bomb.id} bomb={bomb} onRemove={handleRemoveBomb} />
      ))}

      {gameState === 'countdown' && (
        <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20">
          <h2 className="text-9xl font-bold text-white tracking-widest animate-pulse">{countdownMessage}</h2>
        </div>
      )}

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

    </main>
  );
};

export default App;