import React from "react";

export const Navbar = ({ search, setSearch, region, setRegion }) => {
  return (
    <nav className="navbar container">
      <div className="search-box">
        <span className="search-icon" aria-hidden="true">
          🔍
        </span>

        <input
          type="search"
          placeholder="Search for a country..."
          aria-label="Search for a country"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>

      <div className="filter-box">
        <select
          aria-label="Filter by region"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        >
          <option value="">Filter by Region</option>
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
