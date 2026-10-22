import React from "react";

export const CountryList = ({ countries, onSelectCountry }) => {
  return (
    <section className="container">
      {countries.length === 0 ? (
        <p className="empty-message">No countries found.</p>
      ) : (
        <div className="countries-grid">
          {countries.map((country) => (
            <article
              key={country.cca3}
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
              aria-label={`View details for ${country.name.common}`}
            >
              <div className="flag-box">
                {country.flags?.svg || country.flags?.png ? (
                  <img
                    src={country.flags.svg || country.flags.png}
                    alt={`Flag of ${country.name.common}`}
                    loading="lazy"
                  />
                ) : (
                  <span>Flag unavailable</span>
                )}
              </div>

              <div className="card-body">
                <h2>{country.name.common}</h2>

                <p>
                  <strong>Population:</strong>{" "}
                  {country.population.toLocaleString()}
                </p>

                <p>
                  <strong>Region:</strong> {country.region || "N/A"}
                </p>

                <p>
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};
