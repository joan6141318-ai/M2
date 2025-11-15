import React from 'react';

interface HeaderProps {
  onMenuClick: () => void;
}

const MenuIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-8 w-8 text-white"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  return (
    <header className="absolute top-0 left-0 right-0 p-6 z-30 flex justify-end">
      <button onClick={onMenuClick} aria-label="Open menu">
        <MenuIcon />
      </button>
    </header>
  );
};

export default Header;