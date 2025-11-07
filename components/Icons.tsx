import React from 'react';

export const StarIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M12 4 L14 9 L19 9 L15 12 L17 17 L12 14 L7 17 L9 12 L4 9 L10 9 Z" fill="#f1c40f"/>
        <path d="M12 5 L14 9 L18 9 L15 11 L16 15 L12 13 L8 15 L9 11 L6 9 L10 9 Z" fill="#f39c12"/>
    </svg>
);

export const GemIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M6 8 H18 V16 H6 Z" fill="#27ae60" />
        <path d="M7 9 H17 V15 H7 Z" fill="#2ecc71" />
        <path d="M6 8 L12 4 L18 8 V9 H6 V8 Z" fill="#2ecc71" />
        <path d="M7 8 L12 5 L17 8 V9 H7 V8 Z" fill="#A0E8AF" />
    </svg>
);

export const SettingsIcon = ({ className }: { className?: string }) => (
     <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
        <path d="M9 4 H15 V6 H9 Z" fill="#7f8c8d" />
        <path d="M9 18 H15 V20 H9 Z" fill="#7f8c8d" />
        <path d="M4 9 H6 V15 H4 Z" fill="#7f8c8d" />
        <path d="M18 9 H20 V15 H18 Z" fill="#7f8c8d" />
        <path d="M7 7 H9 V9 H7 Z" fill="#7f8c8d" />
        <path d="M15 7 H17 V9 H15 Z" fill="#7f8c8d" />
        <path d="M7 15 H9 V17 H7 Z" fill="#7f8c8d" />
        <path d="M15 15 H17 V17 H15 Z" fill="#7f8c8d" />
        <path d="M9 9 H15 V15 H9 Z" fill="#95a5a6" />
        <path d="M10 10 H14 V14 H10 Z" fill="#bdc3c7" />
        <path d="M11 11 H13 V13 H11 Z" fill="#7f8c8d" />
    </svg>
);


export const GiftIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ shapeRendering: 'crispEdges' }}>
      <path d="M5 10 H19 V18 H5 Z" fill="#c0392b" />
      <path d="M6 11 H18 V17 H6 Z" fill="#e74c3c" />
      <path d="M10 8 H14 V18 H10 Z" fill="#27ae60" />
      <path d="M11 9 H13 V18 H11 Z" fill="#2ecc71" />
      <path d="M5 10 H19 V12 H5 Z" fill="#2ecc71" />
      <path d="M8 6 H10 V8 H8 Z" fill="#27ae60" />
      <path d="M14 6 H16 V8 H14 Z" fill="#27ae60" />
    </svg>
);

// This icon is no longer used in the main UI but kept for potential future use.
export const GingerCatIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 13C7 9.13401 10.134 6 14 6H18C21.866 6 25 9.13401 25 13V20C25 24.4183 21.4183 28 17 28H15C10.5817 28 7 24.4183 7 20V13Z" fill="#F39C12" stroke="#c0392b" strokeWidth="1.5"/>
      <path d="M10 9C10 7.89543 10.8954 7 12 7V7C13.1046 7 14 7.89543 14 9L13 13H11L10 9Z" fill="#E67E22"/>
      <path d="M22 9C22 7.89543 21.1046 7 20 7V7C18.8954 7 18 7.89543 18 9L19 13H21L22 9Z" fill="#E67E22"/>
      <circle cx="12.5" cy="16.5" r="1.5" fill="white"/>
      <circle cx="19.5" cy="16.5" r="1.5" fill="white"/>
      <circle cx="12.5" cy="16.5" r="0.75" fill="black"/>
      <circle cx="19.5" cy="16.5" r="0.75" fill="black"/>
    </svg>
);