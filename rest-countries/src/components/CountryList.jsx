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
        {countries.map((country) => {
          const name = country.name?.common || "Unknown country";
          const flag = country.flags?.png || country.flags?.svg;

          return (
            <article key={country.cca3 || name} className="country-card">
              <button
                type="button"
                className="country-card-button"
                onClick={() => onSelectCountry(country)}
                aria-label={`View details for ${name}`}
              >
                <div className="flag-box">
                  {flag ? (
                    <img
                      src={flag}
                      alt={`Flag of ${name}`}
                      width="320"
                      height="160"
                      loading="lazy"
                      decoding="async"
                      onError={(event) => {
                        console.error(
                          "Flag failed to load:",
                          name,
                          event.currentTarget.src,
                        );
                      }}
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
              </button>
            </article>
          );
        })}
      </div>
    </section>
  );
};
