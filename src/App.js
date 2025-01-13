import React, { useState, useEffect } from 'react';
import './App.css'; 
const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://xcountriesapi.onrender.com/all');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCountries(result.data); // Assuming the data is in result.data
      } catch (error) {
        console.error(`Failed to fetch the country data: ${error.message}`);
        setError(error.message);
      }
    };

    fetchCountries();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />
      <div className="country-cards">
        {error && <div className="error">{error}</div>}
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div key={country.abbr} className="countryCard">
              <img src={country.flag} alt={`${country.name} flag`} />
              <h2>{country.name}</h2>
            </div>
          ))
        ) : (
          <div>No countries found</div>
        )}
      </div>
    </div>
  );
};

export default App;
