import React from 'react';
import { MonsterType } from '../types';

interface MonsterSpriteProps {
  type: MonsterType;
  className?: string;
}

const ScrapBot = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M6 9H18V18H6V9Z" fill="#7f8c8d"/>
        <path d="M7 10H17V17H7V10Z" fill="#95a5a6"/>
        <path d="M9 6H15V9H9V6Z" fill="#bdc3c7"/>
        <path d="M10 7H14V8H10V7Z" fill="#ecf0f1"/>
        <path d="M11 4H13V6H11V4Z" fill="#e74c3c"/>
        <path d="M9 11H10V12H9V11Z" fill="#e74c3c"/>
        <path d="M14 11H15V12H14V11Z" fill="#e74c3c"/>
        <path d="M7 18H9V20H7V18Z" fill="#34495e"/>
        <path d="M15 18H17V20H15V18Z" fill="#34495e"/>
    </svg>
);

const MutantCritter = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M8 10H16V18H8V10Z" fill="#8e44ad"/>
        <path d="M9 11H15V17H9V11Z" fill="#9b59b6"/>
        <path d="M7 12H8V16H7V12Z" fill="#8e44ad"/>
        <path d="M16 12H17V16H16V12Z" fill="#8e44ad"/>
        <path d="M10 8H14V10H10V8Z" fill="#8e44ad"/>
        <path d="M9 9H10V10H9V9Z" fill="#2c3e50"/>
        <path d="M14 9H15V10H14V9Z" fill="#2c3e50"/>
        <path d="M11 12H13V14H11V12Z" fill="#f1c40f"/>
    </svg>
);

const GlowSlug = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M7 14H17V18H7V14Z" fill="#27ae60"/>
        <path d="M8 15H16V17H8V15Z" fill="#2ecc71"/>
        <path d="M9 12H15V14H9V12Z" fill="#27ae60"/>
        <path d="M10 13H14V14H10V13Z" fill="#2ecc71"/>
        <path d="M8 10H10V12H8V10Z" fill="#27ae60"/>
        <path d="M7 11H8V12H7V11Z" fill="#f1c40f"/>
        <path d="M16 11H17V12H16V11Z" fill="#f1c40f"/>
    </svg>
);

const Eyebot = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M7 9H17V17H7V9Z" fill="#bdc3c7"/>
        <path d="M8 10H16V16H8V10Z" fill="#ecf0f1"/>
        <path d="M10 12H14V15H10V12Z" fill="#2c3e50"/>
        <path d="M11 13H13V14H11V13Z" fill="#e74c3c"/>
        <path d="M6 11H7V14H6V11Z" fill="#7f8c8d"/>
        <path d="M17 11H18V14H17V11Z" fill="#7f8c8d"/>
        <path d="M11 7H13V9H11V7Z" fill="#e67e22"/>
    </svg>
);

export const MonsterSprite: React.FC<MonsterSpriteProps> = ({ type, className }) => {
  switch (type) {
    case MonsterType.ScrapBot:
      return <ScrapBot className={className} />;
    case MonsterType.MutantCritter:
      return <MutantCritter className={className} />;
    case MonsterType.GlowSlug:
      return <GlowSlug className={className} />;
    case MonsterType.Eyebot:
      return <Eyebot className={className} />;
    default:
      return null;
  }
};