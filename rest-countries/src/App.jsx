import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import './index.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((err) => console.error('Error fetching data:', err));
  }, []);

  
  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.body.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesRegion = region === '' || country.region === region;
    return matchesSearch && matchesRegion;
  });

  return (
    <div className="app">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />
      <Navbar
        search={search}
        setSearch={setSearch}
        region={region}
        setRegion={setRegion}
      />

      <main className="container">
        {loading ? (
          <h2>Loading countries...</h2>
        ) : (
          <div className="countries-grid">
            {filteredCountries.map((country) => (
              <article key={country.cca3} className="country-card">
                <img
                  src={country.flags.png}
                  alt={country.name.common}
                  loading="lazy"
                />
                <div className="card-body">
                  <h2>{country.name.common}</h2>
                  <p>
                    <strong>Population:</strong>{' '}
                    {country.population.toLocaleString()}
                  </p>
                  <p>
                    <strong>Region:</strong> {country.region}
                  </p>
                  <p>
                    <strong>Capital:</strong>{' '}
                    {country.capital ? country.capital[0] : 'N/A'}
                  </p>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default App;