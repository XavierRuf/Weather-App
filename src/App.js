import { useState } from "react";

import Location from "./components/Location";
import Search from "./components/Search";
import GeoWeather from "./components/GeoWeather";

import { constants } from "./constants";

function App() {
  const [query, setQuery] = useState("");
  const [fetchedWeather, setFetchedWeather] = useState(
    constants.InitalWeatherState
  );
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const { temp, name, country, weather } = fetchedWeather;

  const error = (
    <div style={{ margin: "0 auto", textAlign: "center" }}>
      <h3 style={{ color: "#e62c17", fontWeight: "700" }}>
        Oooops!!! Something went wrong...
      </h3>
    </div>
  );

  const search = async (e) => {
    if (e.key === "Enter") {
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
      setLoading(false);
    }
  };

  const getTempClassName = () => {
    const temp = fetchedWeather.temp;
    if (temp >= 30) {
      return " heat";
    }
    if (temp >= 10 && temp > -10) {
      return " medium-cold";
    }
    return " cold";
  };
  return (
    <div className={!loading ? "app" + getTempClassName() : "app medium-cold"}>
      <main>
        <Search
          query={query}
          search={search}
          onChange={(e) => setQuery(e.target.value)}
        />
        {!name ? (
          <GeoWeather />
        ) : (
          <Location
            name={name}
            country={country}
            temp={temp}
            weather={weather}
          />
        )}
      </main>
    </div>
  );
}

export default App;
