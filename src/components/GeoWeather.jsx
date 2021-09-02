import React, { useState, useEffect, useCallback } from "react";

import Location from "./Location";
import Loader from "./Loader";

import { constants } from "../constants";
function GeoWeather() {
  //geolocation weather
  const [loading, setLoading] = useState(true);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [forecast, setForecast] = useState("");
  const [temperature, setTemperature] = useState("");
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");

  const savePositionToState = (position) => {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchCurrentWeather = useCallback(async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${constants.API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          setForecast(data.weather[0].main);
          setTemperature(15);
          setCityName(data.name);
          setLoading(false);
          setCountry(data.sys.country);
        });
      return res;
    } catch (err) {
      console.error(err);
    }
  }, [latitude, longitude]);

  useEffect(() => {
    fetchCurrentWeather();
  }, [fetchCurrentWeather]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Location
          name={cityName}
          country={country}
          temp={temperature}
          weather={forecast}
        />
      )}
    </>
  );
}

export default GeoWeather;
