import { useEffect, useState } from "react";
import axios from "axios";
import Weather from "./Weather";

const Country = ({ country }) => {
  const [weather, setWeather] = useState(null);
  useEffect(() => {
    const [lat, lon] = country.latlng;
    const apiKey = import.meta.env.VITE_OPEN_WEATHER;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
      )
      .then((response) => response.data)
      .then((data) => {
        setWeather({
          ...weather,
          temperature: data.main.temp,
          wind: data.wind.speed,
          icon: data.weather[0].icon,
        });
      });
  }, []);

  return (
    <div>
      <h2>{country.name.common}</h2>
      capital {country.capital}
      <br />
      area {country.area}
      <h3>languages</h3>
      <ul>
        {Object.entries(country.languages).map(([key, value]) => (
          <li key={key}>{value}</li>
        ))}
      </ul>
      <img src={country.flags.png} alt={country.flags.alt} />
      {weather !== null ? (
        <Weather weather={weather} location={country.capital} />
      ) : null}
    </div>
  );
};

export default Country;
