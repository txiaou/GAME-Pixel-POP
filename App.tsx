import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Bubble as BubbleType, Monster as MonsterType, MonsterType as MonsterEnum, Bomb as BombType, LargeBubble as LargeBubbleType, Candy as CandyType } from './types';
import { Bubble } from './components/Bubble';
import { LargeBubble } from './components/LargeBubble';
import { Candy } from './components/Candy';
import { Monster } from './components/Monster';
import { BubbleMachine } from './components/BubbleMachine';
import { Bomb } from './components/Bomb';
import { LevelSelector } from './components/LevelSelector';
import { StarIcon, GemIcon, SettingsIcon, GingerCatIcon } from './components/Icons';

type GameState = 'playing' | 'gameOver' | 'countdown' | 'levelTransition';
interface MergeEvent {
  ids: number[];
  position: { x: number; y: number };
  color: string;
}

const LEVEL_UP_SCORE = 10;
const AVAILABLE_LEVELS = [1, 2];
const BUBBLE_COLORS = ['#d35400', '#27ae60', '#c0392b', '#8e44ad', '#2980b9']; // Orange, Green, Red, Purple, Blue

const App: React.FC = () => {
  const [bubbles, setBubbles] = useState<BubbleType[]>([]);
  const [largeBubbles, setLargeBubbles] = useState<LargeBubbleType[]>([]);
  const [candies, setCandies] = useState<CandyType[]>([]);
  const [monsters, setMonsters] = useState<MonsterType[]>([]);
  const [bombs, setBombs] = useState<BombType[]>([]);
  const [isShooting, setIsShooting] = useState(false);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [gameState, setGameState] = useState<GameState>('countdown');
  const [isShaking, setIsShaking] = useState(false);
  const [countdownMessage, setCountdownMessage] = useState<string>('3');
  const bubbleRefs = useRef(new Map<number, HTMLDivElement>());

  const selectLevel = useCallback((level: number) => {
    setLevel(level);
    setScore(0);
    setBubbles([]);
    setLargeBubbles([]);
    setCandies([]);
    setMonsters([]);
    setBombs([]);
    setGameState('countdown');
    setIsShaking(false);
  }, []);
  
  // Countdown logic
  useEffect(() => {
    if (gameState === 'countdown') {
      const messages = ['3', '2', '1', 'GO!'];
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
      }, 800);

      return () => clearInterval(interval);
    }
  }, [gameState]);
  
  // Level Transition Logic
  useEffect(() => {
    if (gameState === 'levelTransition') {
      const timer = setTimeout(() => {
        selectLevel(2);
      }, 2000); // Show "Level 2" for 2 seconds
      return () => clearTimeout(timer);
    }
  }, [gameState, selectLevel]);

  // Automatic shooting logic
  useEffect(() => {
    if (gameState !== 'playing') return;

    const shootInterval = setInterval(() => {
      setIsShooting(true);

      const bubbleCount = Math.floor(Math.random() * 2) + 1; // 1 or 2
      const newBubbles: BubbleType[] = [];

      for (let i = 0; i < bubbleCount; i++) {
          const isBomb = level === 2 && Math.random() < 0.20;
          const randomColor = BUBBLE_COLORS[Math.floor(Math.random() * BUBBLE_COLORS.length)];
          
          newBubbles.push({
              id: Date.now() + i,
              x: 30 + Math.random() * 40,
              duration: 2000 + Math.random() * 2000,
              type: isBomb ? 'bomb' : 'normal',
              color: randomColor,
              travelDist: 20 + Math.random() * 40,
          });
      }
      
      setBubbles((prev) => [...prev, ...newBubbles]);

      setTimeout(() => setIsShooting(false), 200);

    }, 1500 + Math.random() * 1000);

    return () => clearInterval(shootInterval);
  }, [gameState, level]);

  const handleMerge = useCallback((mergeEvents: MergeEvent[]) => {
    const idsToRemove = new Set<number>();
    const newLargeBubbles: LargeBubbleType[] = [];

    mergeEvents.forEach(event => {
        event.ids.forEach(id => idsToRemove.add(id));
        newLargeBubbles.push({
            id: Date.now() + Math.random(),
            ...event.position,
            color: event.color,
            type: 'large',
        });
    });

    setBubbles(prev => prev.filter(b => !idsToRemove.has(b.id)));
    setLargeBubbles(prev => [...prev, ...newLargeBubbles]);
  }, []);

  // Bubble merging logic
  useEffect(() => {
    if (gameState !== 'playing') return;
    let animationFrameId: number;
    const gameLoop = () => {
        const mergeEvents: MergeEvent[] = [];
        const processedIds = new Set<number>();
        // FIX: Explicitly type currentBubbleNodes to resolve type inference issue.
        const currentBubbleNodes: HTMLDivElement[] = Array.from(bubbleRefs.current.values());

        for (let i = 0; i < currentBubbleNodes.length; i++) {
            for (let j = i + 1; j < currentBubbleNodes.length; j++) {
                const bubbleNode1 = currentBubbleNodes[i];
                const bubbleNode2 = currentBubbleNodes[j];
                const id1 = parseInt(bubbleNode1.dataset.id!, 10);
                const id2 = parseInt(bubbleNode2.dataset.id!, 10);
                if (processedIds.has(id1) || processedIds.has(id2)) continue;

                const color1 = bubbleNode1.dataset.color;
                const color2 = bubbleNode2.dataset.color;
                const type1 = bubbleNode1.dataset.type;
                const type2 = bubbleNode2.dataset.type;

                if (color1 && color1 === color2 && type1 === 'normal' && type2 === 'normal') {
                    const rect1 = bubbleNode1.getBoundingClientRect();
                    const rect2 = bubbleNode2.getBoundingClientRect();
                    if(rect1.width === 0 || rect2.width === 0) continue;

                    const distance = Math.hypot(
                        (rect1.left + rect1.width / 2) - (rect2.left + rect2.width / 2),
                        (rect1.top + rect1.height / 2) - (rect2.top + rect2.height / 2)
                    );

                    if (distance < rect1.width) {
                        mergeEvents.push({
                            ids: [id1, id2],
                            position: {
                                x: (((rect1.left + rect2.left) / 2 + rect1.width / 2) / window.innerWidth) * 100,
                                y: (((rect1.top + rect2.top) / 2 + rect1.height / 2) / window.innerHeight) * 100,
                            },
                            color: color1,
                        });
                        processedIds.add(id1);
                        processedIds.add(id2);
                    }
                }
            }
        }
        if (mergeEvents.length > 0) handleMerge(mergeEvents);
        animationFrameId = requestAnimationFrame(gameLoop);
    };
    animationFrameId = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(animationFrameId);
  }, [gameState, bubbles, handleMerge]);


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
      setBubbles([]);
      setTimeout(() => setIsShaking(false), 600);
      return;
    }

    const monsterTypes = Object.values(MonsterEnum).filter(
      (v) => typeof v === 'number'
    ) as MonsterEnum[];
    const randomType = monsterTypes[Math.floor(Math.random() * monsterTypes.length)];
    
    const newScore = score + 1;
    setScore(newScore);

    if (level === 1 && newScore >= LEVEL_UP_SCORE) {
      setBubbles([]);
      setMonsters([]);
      setGameState('levelTransition');
      return;
    }
    
    const newMonster: MonsterType = { id: Date.now(), x, y, type: randomType };
    setMonsters((prev) => [...prev, newMonster]);
  }, [bubbles, score, level]);
  
  const handleLargeBubblePop = useCallback((bubbleId: number, position: { x: number; y: number }) => {
    const poppedBubble = largeBubbles.find(b => b.id === bubbleId);
    if (!poppedBubble) return;
    setLargeBubbles(prev => prev.filter(b => b.id !== bubbleId));
    setCandies(prev => [...prev, { id: Date.now(), x: position.x, y: position.y, color: poppedBubble.color }]);
  }, [largeBubbles]);

  const handleRemoveBubble = useCallback((bubbleId: number) => {
    setBubbles((prev) => prev.filter((b) => b.id !== bubbleId));
  }, []);

  const handleRemoveMonster = useCallback((monsterId: number) => {
    setMonsters((prev) => prev.filter((m) => m.id !== monsterId));
  }, []);

  const handleRemoveBomb = useCallback((bombId: number) => {
    setBombs((prev) => prev.filter((b) => b.id !== bombId));
  }, []);
  
  const handleRemoveCandy = useCallback((candyId: number) => {
    setCandies((prev) => prev.filter((c) => c.id !== candyId));
  }, []);

  const handleRestart = () => selectLevel(level);
  
  const progressPercentage = level === 1 ? Math.min((score / LEVEL_UP_SCORE) * 100, 100) : 100;

  return (
    <main className={`relative w-full h-full overflow-hidden select-none ${isShaking ? 'animate-shake' : ''} flex items-center justify-center`}>
      <div className="w-full h-full bg-[#2c3e50] border-8 border-[#1a1a1a] shadow-inner p-1">
        <div className="relative w-full h-full bg-zinc-800 border-2 border-zinc-900 overflow-hidden">
         
          {/* Header */}
          <header className="absolute top-0 left-0 right-0 p-2 flex justify-between items-center z-10 bg-zinc-900/50 border-b-2 border-zinc-900">
            <div className="flex items-center gap-2">
              <div className="bg-zinc-700 border-2 border-zinc-600 flex items-center px-2 py-1">
                <StarIcon className="w-6 h-6" />
                <span className="text-lg font-bold text-yellow-300 ml-2">{score}</span>
              </div>
              <div className="bg-zinc-700 border-2 border-zinc-600 flex items-center px-2 py-1">
                <GemIcon className="w-6 h-6" />
                <span className="text-lg font-bold text-green-400 ml-2">245</span>
              </div>
            </div>
             <div className="flex items-center gap-2">
                <SettingsIcon className="w-8 h-8 cursor-pointer" />
            </div>
          </header>

          {/* Game Content */}
          <div className="relative w-full h-full z-0">
            {gameState === 'playing' && bubbles.map((bubble) => (
              <Bubble 
                  key={bubble.id} bubble={bubble} onPop={handlePop} onRemove={handleRemoveBubble} 
                  ref={node => node ? bubbleRefs.current.set(bubble.id, node) : bubbleRefs.current.delete(bubble.id)}
              />
            ))}
            {largeBubbles.map((bubble) => <LargeBubble key={bubble.id} bubble={bubble} onPop={handleLargeBubblePop} />)}
            {candies.map((candy) => <Candy key={candy.id} candy={candy} onRemove={handleRemoveCandy} />)}
            {monsters.map((monster) => <Monster key={monster.id} monster={monster} onRemove={handleRemoveMonster} />)}
            {bombs.map((bomb) => <Bomb key={bomb.id} bomb={bomb} onRemove={handleRemoveBomb} />)}
          </div>
          
          <LevelSelector currentLevel={level} onSelectLevel={selectLevel} levels={AVAILABLE_LEVELS} />

          {/* Modals */}
          {(gameState === 'countdown' || gameState === 'levelTransition' || gameState === 'gameOver') && (
            <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center z-20 text-center p-4">
              <div className="bg-zinc-800 p-6 border-4 border-zinc-600 shadow-lg w-full max-w-sm">
                {gameState === 'countdown' && <h2 className="text-7xl font-bold text-yellow-400 animate-pulse tracking-widest">{countdownMessage}</h2>}
                {gameState === 'levelTransition' && <h2 className="text-5xl font-bold text-green-400 animate-pulse tracking-widest">LEVEL 2</h2>}
                {gameState === 'gameOver' && (
                  <>
                    <h2 className="text-4xl font-bold text-red-500 tracking-wider">GAME OVER</h2>
                    <p className="mt-4 text-xl text-zinc-300">SCORE: {score}</p>
                    <button onClick={handleRestart} className="mt-6 px-6 py-2 text-lg font-bold text-zinc-900 bg-yellow-400 border-b-4 border-yellow-600 hover:bg-yellow-300 active:border-b-0 active:translate-y-1">
                      RESTART
                    </button>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Footer */}
          <footer className="absolute bottom-0 left-0 right-0 h-40 z-0 bg-zinc-900/50 border-t-2 border-zinc-900">
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-4/5 max-w-sm">
                <div className="h-6 bg-zinc-700 border-2 border-zinc-600 overflow-hidden flex items-center p-0.5">
                    <div className="h-full bg-green-500" style={{ width: `${progressPercentage}%` }}></div>
                    <span className="absolute w-full text-center text-white font-bold text-sm tracking-widest">{level === 1 ? `${score} / ${LEVEL_UP_SCORE}` : `LEVEL ${level}`}</span>
                </div>
              </div>
              <BubbleMachine isShooting={isShooting} />
          </footer>

        </div>
      </div>
    </main>
  );
};

export default App;