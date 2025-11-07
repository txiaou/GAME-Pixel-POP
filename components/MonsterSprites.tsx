
import React from 'react';
import { MonsterType } from '../types';

interface MonsterSpriteProps {
  type: MonsterType;
  className?: string;
}

const Slime = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path fill="#65C466" d="M4 11H12V12H4z"/>
    <path fill="#44A545" d="M3 10H13V11H3z"/>
    <path fill="#65C466" d="M3 8H13V10H3z"/>
    <path fill="#44A545" d="M4 7H12V8H4z"/>
    <path fill="#2ECC71" d="M5 6H11V7H5z"/>
    <path fill="#FFFFFF" d="M6 8H7V9H6zM10 8H11V9H10z"/>
    <path fill="#000000" d="M5 8H6V9H5zM9 8H10V9H9z"/>
  </svg>
);

const Bat = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path fill="#A076F9" d="M2 5H5V7H2zM11 5H14V7H11z"/>
    <path fill="#8458D3" d="M5 6H11V9H5z"/>
    <path fill="#FFFFFF" d="M7 7H8V8H7zM9 7H10V8H9z"/>
    <path fill="#FF0000" d="M6 7H7V8H6zM8 7H9V8H8z"/>
    <path fill="#A076F9" d="M6 9H7V10H6zM9 9H10V10H9z"/>
  </svg>
);

const Ghost = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
    <path fill="#FFFFFF" d="M4 5H12V12H4z"/>
    <path fill="#FFFFFF" d="M5 12H6V13H5zM7 12H8V14H7zM9 12H10V13H9z"/>
    <path fill="#E0E0E0" d="M11 12H12V11H11zM4 12H5V11H4z"/>
    <path fill="#000000" d="M6 7H8V9H6zM9 7H11V9H9z"/>
  </svg>
);

const Cyclops = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ imageRendering: 'pixelated' }}>
        <path fill="#F9A825" d="M4 6H12V11H4z"/>
        <path fill="#F57F17" d="M5 5H11V6H5zM4 11H12V12H4z"/>
        <path fill="#FFFFFF" d="M7 7H10V10H7z"/>
        <path fill="#000000" d="M8 8H9V9H8z"/>
        <path fill="#F9A825" d="M5 12H6V13H5zM10 12H11V13H10z"/>
    </svg>
);

export const MonsterSprite: React.FC<MonsterSpriteProps> = ({ type, className }) => {
  switch (type) {
    case MonsterType.Slime:
      return <Slime className={className} />;
    case MonsterType.Bat:
      return <Bat className={className} />;
    case MonsterType.Ghost:
      return <Ghost className={className} />;
    case MonsterType.Cyclops:
      return <Cyclops className={className} />;
    default:
      return null;
  }
};
