export const CountryList = ({ countries, onSelectCountry }) => {
  if (countries.length === 0) {
    return (
      <section className="container">
        <p className="empty-message">No countries found.</p>
      </section>
    );
  }

  return (
    <section className="container" aria-label="Countries">
      <div className="countries-grid">
        {countries.map((country, index) => {
          const name = country.name?.common || "Unknown country";
          const flag = country.flags?.svg || country.flags?.png;

          return (
            <article
              key={country.cca3 || name}
              className="country-card"
              onClick={() => onSelectCountry(country)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  onSelectCountry(country);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`View details for ${name}`}
            >
              <div className="flag-box">
                {flag ? (
                  <img
                    src={flag}
                    alt={`Flag of ${name}`}
                    width="320"
                    height="180"
                    loading={index === 0 ? "eager" : "lazy"}
                    fetchPriority={index === 0 ? "high" : "auto"}
                    decoding="async"
                  />
                ) : (
                  <span className="flag-placeholder">Flag unavailable</span>
                )}
              </div>

              <div className="card-body">
                <h2>{name}</h2>
                <p>
                  <strong>Population:</strong>{" "}
                  {(country.population ?? 0).toLocaleString()}
                </p>
                <p>
                  <strong>Region:</strong> {country.region || "N/A"}
                </p>
                <p>
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};
