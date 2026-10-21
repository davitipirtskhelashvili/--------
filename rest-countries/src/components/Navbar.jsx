import React from 'react';

export const Navbar = () => {
  return (
    <nav className="navbar container">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search for a country..."
        />
      </div>

      <div className="filter-box">
        <select defaultValue="">
          <option value="" disabled hidden>Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
    </nav>
  );
};