export enum MonsterType {
  Slime,
  Bat,
  Ghost,
  Cyclops,
}

export interface Bubble {
  id: number;
  x: number;
  duration: number;
}

export interface Monster {
  id: number;
  x: number;
  y: number;
  type: MonsterType;
}
