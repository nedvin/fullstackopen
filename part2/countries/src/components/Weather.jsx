const Weather = ({ weather, location }) => {
  return (
    <div>
      <h3>Weather in {location}</h3>
      <p>temperature {weather.temperature} Celcius</p>
      <div>
        <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} />
      </div>
      <p>wind {weather.wind} m/s</p>
    </div>
  );
};

export default Weather;
