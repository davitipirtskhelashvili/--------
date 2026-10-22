import React from "react";

export const Header = ({ darkMode, toggleTheme }) => {
  return (
    <header className="header">
      <div className="container header-container">
        <h1 className="logo">Around The World</h1>
        <button className="theme-btn" onClick={toggleTheme} type="button">
          <span>{darkMode ? "☀️" : "🌙"}</span>
          <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
    </header>
  );
};
