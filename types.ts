export enum MonsterType {
  Ginger,
  Gray,
  Black,
  White,
}

export interface Bubble {
  id: number;
  x: number;
  duration: number;
  type: 'normal' | 'bomb';
  color: string;
  travelDist: number;
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
