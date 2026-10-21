import React from 'react';

export const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="header">
      <div className="container header-container">
        <h1 className="logo">Where in the world?</h1>
        <button className="theme-btn" onClick={toggleTheme} type="button">
          <span>{darkMode ? '☀️' : '🌙'}</span>
          <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
      </div>
    </header>
  );
};