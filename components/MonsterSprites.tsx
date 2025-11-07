import React from 'react';
import { MonsterType } from '../types';

interface MonsterSpriteProps {
  type: MonsterType;
  className?: string;
}

const GingerCat = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path fill="#D35400" d="M4 4h1v1H4z M11 4h1v1h-1z" />
      <path fill="#E67E22" d="M4 5h8v4H4z" />
      <path fill="#FFFFFF" d="M6 6h1v2H6z M9 6h1v2H9z" />
      <path fill="#000000" d="M6 7h1v1H6z M9 7h1v1H9z" />
      <path fill="#FFC0CB" d="M7 8h2v1H7z" />
      <path fill="#E67E22" d="M5 9h6v4H5z" />
      <path fill="#D35400" d="M11 9h1v3h-1z" />
    </svg>
);

const GrayCat = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path fill="#7F8C8D" d="M4 4h1v1H4z M11 4h1v1h-1z" />
      <path fill="#95A5A6" d="M4 5h8v4H4z" />
      <path fill="#FFFFFF" d="M6 6h1v2H6z M9 6h1v2H9z" />
      <path fill="#000000" d="M6 7h1v1H6z M9 7h1v1H9z" />
      <path fill="#FFC0CB" d="M7 8h2v1H7z" />
      <path fill="#95A5A6" d="M5 9h6v4H5z" />
      <path fill="#7F8C8D" d="M11 9h1v3h-1z" />
    </svg>
);

const BlackCat = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path fill="#2C3E50" d="M4 4h1v1H4z M11 4h1v1h-1z" />
      <path fill="#34495E" d="M4 5h8v4H4z" />
      <path fill="#F1C40F" d="M6 6h1v2H6z M9 6h1v2H9z" />
      <path fill="#FFC0CB" d="M7 8h2v1H7z" />
      <path fill="#34495E" d="M5 9h6v4H5z" />
      <path fill="#2C3E50" d="M11 9h1v3h-1z" />
    </svg>
);

const WhiteCat = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
      <path fill="#BDC3C7" d="M4 4h1v1H4z M11 4h1v1h-1z" />
      <path fill="#ECF0F1" d="M4 5h8v4H4z" />
      <path fill="#FFFFFF" d="M6 6h1v2H6z M9 6h1v2H9z" />
      <path fill="#000000" d="M6 7h1v1H6z M9 7h1v1H9z" />
      <path fill="#FFC0CB" d="M7 8h2v1H7z" />
      <path fill="#ECF0F1" d="M5 9h6v4H5z" />
      <path fill="#BDC3C7" d="M11 9h1v3h-1z" />
    </svg>
);

export const MonsterSprite: React.FC<MonsterSpriteProps> = ({ type, className }) => {
  switch (type) {
    case MonsterType.Ginger:
      return <GingerCat className={className} />;
    case MonsterType.Gray:
      return <GrayCat className={className} />;
    case MonsterType.Black:
      return <BlackCat className={className} />;
    case MonsterType.White:
      return <WhiteCat className={className} />;
    default:
      return null;
  }
};
