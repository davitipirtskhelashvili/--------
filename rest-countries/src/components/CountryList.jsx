import React from 'react';

export const CountryList = () => {
  return (
    <section className="container">
      <div className="countries-grid">
        {/* ქვეყნის ბარათის შაბლონი */}
        <article className="country-card">
          <div className="flag-box">
            <img src="https://flagcdn.com/w320/de.png" alt="Germany flag" />
          </div>
          <div className="card-body">
            <h2>Germany</h2>
            <p><strong>Population:</strong> 81,770,900</p>
            <p><strong>Region:</strong> Europe</p>
            <p><strong>Capital:</strong> Berlin</p>
          </div>
        </article>
      </div>
    </section>
  );
};