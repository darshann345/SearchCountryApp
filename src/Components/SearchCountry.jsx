import React, { useState, useEffect } from "react";
import axios from "axios";
import UseDebounch from "./UseDebouce";
const CountryCard = ({ name, flag }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        border: "1px solid black",
        borderRadius: "8px",
        width: "200px",
        height: "200px",

        
        margin: "10px",
        padding: "10px",
      }}
    >
      <img
        src={flag}
        style={{ width: "200px", height: "120px", padding: "10px" }}
        alt={`Flag of ${name}`}
      />
      <h4>{name}</h4>
    </div>
  );
};

function SearchCountry() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [filterCountry, setFilterCountry] = useState([]);
  const debouncedSearch = UseDebounch(searchCountry, 300);

  const API_URL = `https://restcountries.com/v3.1/all`;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(API_URL);
        const data = response.data;
        console.log(JSON.stringify(data, null, 2));
        setCountries(data);
        setFilterCountry(data); 
      } catch (error) {
        console.error("Error fetching data: ", error.message);
      }
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    if (debouncedSearch) {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(debouncedSearch.toLowerCase())
      );
      setFilterCountry(filtered);
    } else {
      setFilterCountry(countries);
    }
  }, [debouncedSearch, countries]);
  

  return (
    <>
      <nav style={{
        width: "100%",
        height: "60px",
        border: "1px solid black",
        borderRadius: "2px",
        backgroundColor: "rgb(255,253,253)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <input
          style={{
            width: "40%",
            height: "50%",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center"
          }}
          type="text"
          placeholder="Search for countries"
          value={searchCountry}
          onChange={(e) => setSearchCountry(e.target.value)}
        />
      </nav>

      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {filterCountry.map((country) => (
          <CountryCard
            key={country.cca3} // Use cca3 as a unique key
            name={country.name.common}
            flag={country.flags.png}
          />
        ))}
      </div>
    </>
  );
}

export default SearchCountry;

