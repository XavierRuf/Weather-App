import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Alert from "react-bootstrap/esm/Alert";

import Location from "./components/Location";
import Search from "./components/Search";
import GeoWeather from "./components/GeoWeather";
import Layout from "./components/Layout";

import { constants } from "./constants";

function App() {
  const [query, setQuery] = useState("");
  const [fetchedWeather, setFetchedWeather] = useState(
    constants.InitalWeatherState
  );
  const [isError, setIsError] = useState(false);
  const { temp, name, country, weather } = fetchedWeather;

  const error = (
    <Alert variant="danger" style={{ margin: "0 auto", textAlign: "center" }}>
      Oooops!!! Something went wrong... Enter the correct name and try again!
    </Alert>
  );

  const search = async (e) => {
    try {
      if (e.key === "Enter") {
        e.preventDefault();
        setIsError(false);
        const fetchedBySearch = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${constants.API_KEY}`
        ).then((res) => {
          return res.json();
        });
        if (!fetchedBySearch.name) {
          return setIsError(error);
        }
        const result = {
          temp: fetchedBySearch.main.temp,
          name: fetchedBySearch.name,
          country: fetchedBySearch.sys.country,
          weather: fetchedBySearch.weather[0].main,
        };
        setFetchedWeather(result);
        setQuery("");
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Layout temperature={fetchedWeather.temp}>
      <Search
        query={query}
        search={search}
        onChange={(e) => setQuery(e.target.value)}
      />
      {isError ? (
        isError
      ) : !name ? (
        <GeoWeather />
      ) : (
        <Location name={name} country={country} temp={temp} weather={weather} />
      )}
    </Layout>
  );
}

export default App;
