export enum MonsterType {
  ScrapBot,
  MutantCritter,
  GlowSlug,
  Eyebot,
}

export interface Bubble {
  id: number;
  x: number;
  duration: number;
  type: 'normal' | 'bomb';
  color: string;
  travelDist: number;
}

export interface LargeBubble {
  id: number;
  x: number;
  y: number;
  type: 'large';
  color: string;
}

export interface Monster {
  id: number;
  x: number;
  y: number;
  type: MonsterType;
}

export interface Bomb {
  id: number;
  x: number;
  y: number;
}

export interface Candy {
  id: number;
  x: number;
  y: number;
  color: string;
}