export const Navbar = ({ search, setSearch, region, setRegion }) => {
  const clearSearch = () => {
    setSearch("");
  };

  return (
    <nav className="navbar container" aria-label="Country search and filters">
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

        {search.length > 0 && (
          <button
            className="clear-search"
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            title="Clear search"
          ></button>
        )}
      </div>

      <div className="filter-box">
        <select
          aria-label="Filter by region"
          value={region}
          onChange={(event) => setRegion(event.target.value)}
        >
          <option value="">All regions</option>
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
