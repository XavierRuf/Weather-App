import React, { useState, useEffect } from "react";

import Location from "./Location";

import { constants } from "../constants";
function GeoWeather() {
  //geolocation weather
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [forecast, setForecast] = useState("");
  const [temperature, setTemperature] = useState("");
  const [cityName, setCityName] = useState("");

  const savePositionToState = (position) => {
    console.log(position);
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  };

  const fetchCurrentWeather = async () => {
    try {
      await window.navigator.geolocation.getCurrentPosition(
        savePositionToState
      );
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&exclude=hourly,daily&appid=${constants.API_KEY}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setForecast(data.weather[0].main)
          setTemperature(data.main.temp);
          setCityName(data.name);
        });
      console.log("res ---", res);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCurrentWeather();
  }, []);
  return (
    <Location name={cityName} temp={temperature} weather={forecast} />
  );
}

export default GeoWeather;
