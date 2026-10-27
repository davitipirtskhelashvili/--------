import { useEffect, useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Navbar } from "./components/Navbar";
import { CountryList } from "./components/CountryList";
import { Footer } from "./components/Footer";
import "./index.css";

const API_URL = "https://countries.dev/countries";

function normalizeCountry(country) {
  const flagUrl = country.alpha2Code
    ? `https://flagcdn.com/w320/${country.alpha2Code.toLowerCase()}.png`
    : "";

  const currencies = Array.isArray(country.currencies)
    ? Object.fromEntries(
        country.currencies.map((currency) => [currency.code, currency]),
      )
    : {};

  const languages = Array.isArray(country.languages)
    ? Object.fromEntries(
        country.languages.map((language) => [
          language.iso639_1 || language.name,
          language.name,
        ]),
      )
    : {};

  return {
    ...country,
    cca3: country.alpha3Code,
    name: {
      common: country.name,
      nativeName: country.nativeName
        ? {
            native: {
              common: country.nativeName,
            },
          }
        : {},
    },
    flags: {
      svg: flagUrl,
      png: flagUrl,
    },
    population: country.population ?? 0,
    region: country.region || "",
    subregion: country.subregion || "",
    capital: country.capital ? [country.capital] : [],
    tld: country.topLevelDomain || [],
    currencies,
    languages,
    borders: country.borders || [],
  };
}

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("");
  const [darkMode, setDarkMode] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCountries() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("Failed to load countries.");
        }

        const result = await response.json();

        if (!Array.isArray(result)) {
          throw new Error("Unexpected API response.");
        }

        const normalizedCountries = result.map(normalizeCountry);
        setCountries(normalizedCountries);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Countries API error:", err);
          setError("ქვეყნების ჩატვირთვა ვერ მოხერხდა. სცადე თავიდან.");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    fetchCountries();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode((currentMode) => !currentMode);
  };

  const filteredCountries = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return countries.filter((country) => {
      const countryName = country.name?.common || "";

      const matchesSearch = countryName
        .toLowerCase()
        .includes(normalizedSearch);

      const matchesRegion = region === "" || country.region === region;

      return matchesSearch && matchesRegion;
    });
  }, [countries, search, region]);

  const borderCountries = useMemo(() => {
    if (!selectedCountry) return [];

    const countryMap = new Map(
      countries.map((country) => [country.cca3, country]),
    );

    return (selectedCountry.borders || [])
      .map((code) => countryMap.get(code))
      .filter(Boolean);
  }, [selectedCountry, countries]);

  const selectCountry = (country) => {
    setSelectedCountry(country);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const goBack = () => {
    setSelectedCountry(null);
  };

  return (
    <div className="app">
      <Header darkMode={darkMode} toggleTheme={toggleTheme} />

      {selectedCountry ? (
        <main className="container details-page">
          <button className="back-button" type="button" onClick={goBack}>
            ← Back
          </button>

          <div className="country-details">
            <div className="details-flag">
              {selectedCountry.flags.svg && (
                <img
                  src={selectedCountry.flags.svg}
                  alt={`Flag of ${selectedCountry.name.common}`}
                />
              )}
            </div>

            <div className="details-content">
              <h2>{selectedCountry.name.common}</h2>

              <div className="details-columns">
                <div>
                  <p>
                    <strong>Native Name:</strong>{" "}
                    {Object.values(selectedCountry.name.nativeName || {})[0]
                      ?.common || selectedCountry.name.common}
                  </p>

                  <p>
                    <strong>Population:</strong>{" "}
                    {selectedCountry.population.toLocaleString()}
                  </p>

                  <p>
                    <strong>Region:</strong> {selectedCountry.region || "N/A"}
                  </p>

                  <p>
                    <strong>Sub Region:</strong>{" "}
                    {selectedCountry.subregion || "N/A"}
                  </p>

                  <p>
                    <strong>Capital:</strong>{" "}
                    {selectedCountry.capital.join(", ") || "N/A"}
                  </p>
                </div>

                <div>
                  <p>
                    <strong>Top Level Domain:</strong>{" "}
                    {selectedCountry.tld.join(", ") || "N/A"}
                  </p>

                  <p>
                    <strong>Currencies:</strong>{" "}
                    {Object.values(selectedCountry.currencies || {})
                      .map((currency) => currency.name)
                      .join(", ") || "N/A"}
                  </p>

                  <p>
                    <strong>Languages:</strong>{" "}
                    {Object.values(selectedCountry.languages || {}).join(
                      ", ",
                    ) || "N/A"}
                  </p>
                </div>
              </div>

              <div className="border-countries">
                <strong>Border Countries:</strong>

                <div className="border-list">
                  {borderCountries.length > 0 ? (
                    borderCountries.map((country) => (
                      <button
                        type="button"
                        className="border-button"
                        key={country.cca3}
                        onClick={() => selectCountry(country)}
                      >
                        {country.name.common}
                      </button>
                    ))
                  ) : (
                    <span>None</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <>
          <Navbar
            search={search}
            setSearch={setSearch}
            region={region}
            setRegion={setRegion}
          />

          <main>
            {loading ? (
              <p className="status-message">Loading countries...</p>
            ) : error ? (
              <div className="status-message">
                <p>{error}</p>
                <button type="button" onClick={() => window.location.reload()}>
                  Try again
                </button>
              </div>
            ) : (
              <CountryList
                countries={filteredCountries}
                onSelectCountry={selectCountry}
              />
            )}
          </main>
        </>
      )}

      <Footer />
    </div>
  );
}

export default App;
