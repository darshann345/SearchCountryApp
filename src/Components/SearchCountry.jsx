import React, { useState, useEffect } from 'react';
import './../Components/SearchCountry.css';

const CountryApp = () => {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true); 
  
    useEffect(() => {
      const fetchCountries = async () => {
        try {
          const response = await fetch('https://restcountries.com/v3.1/all');
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setCountries(data);
        } catch (error) {
          console.error('Failed to fetch countries:', error);
          setError(error);
        } finally {
          setLoading(false); 
        }
      };
  
      fetchCountries();
    }, []);
  
    const handleSearch = (e) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredCountries = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="country-app">
        <h1>Country Search App</h1>
        <input
          type="text"
          placeholder="Search for a country..."
          value={searchTerm}
          onChange={handleSearch}
        />
        {error && <p className="error">Failed to load countries</p>}
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="country-list">
            {filteredCountries.length > 0 ? (
              filteredCountries.map((country) => (
                <div className="countryCard" key={country.cca3}>
                  <img src={country.flags.png} alt={`${country.name.common} flag`} />
                  <h2>{country.name.common}</h2>
                  <p>Capital: {country.capital?.[0] || 'N/A'}</p>
                  <span>Region: {country.region}</span>
                </div>
              ))
            ) : (
              <p>No results found</p>
            )}
          </div>
        )}
      </div>
    );
  };
  export default CountryApp;