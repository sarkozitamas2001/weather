import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import Search from "../search/search";

import "./forecast.css";

import { fetchForecast } from "../../api/api.js";
import {
  setFavoriteStatus,
  getFavoriteStatus,
  deleteFavorite,
} from "../../utils/localStorageHelpers.js";
import { herculeanPropotionsMititeiSuccessChance } from "../../utils/successfulBBQ.js";

const Forecast = () => {
  const [forecast, setForecast] = useState([]);
  const [cityName, setCityName] = useState("Cehu Silvaniei");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchForecastAsync = async () => {
      try {
        const response = await fetchForecast(cityName);
        const { country, name } = response.location;

        const forecastWithFavorites = response.forecast.forecastday.map(
          (item) => ({
            ...item,
            favorite: getFavoriteStatus(item.date, name),
          })
        );

        setForecast({
          country,
          name,
          forecastday: forecastWithFavorites,
        });
        setError(null);
      } catch (error) {
        setError(error);
      }
    };

    fetchForecastAsync();
  }, [cityName]);

  const handleToggleFavorite = (event, element) => {
    event.stopPropagation();

    setForecast((prevForecast) => {
      const updatedForecast = prevForecast.forecastday.map((item) => {
        if (item.date === element.date) {
          const favorite = !item.favorite;
          if (favorite) {
            const day = {
              condition: {
                icon: element.day.condition.icon,
                text: element.day.condition.text,
              },
              mintemp_c: element.day.mintemp_c,
              maxtemp_c: element.day.maxtemp_c,
              daily_chance_of_rain: element.day.daily_chance_of_rain,
              totalprecip_mm: element.day.totalprecip_mm,
              daily_chance_of_snow: element.day.daily_chance_of_snow,
              totalsnow_cm: element.day.totalsnow_cm,
              avghumidity: element.day.avghumidity,
              uv: element.day.uv,
            };
            setFavoriteStatus(element.date, day, forecast.name);
          } else {
            deleteFavorite(element.date, forecast.name);
          }
          return {
            ...item,
            favorite,
          };
        }
        return item;
      });
      return {
        ...prevForecast,
        forecastday: updatedForecast,
      };
    });
  };

  const handleOnSearchChange = (searchData) => {
    setCityName(searchData);
  };

  if (error) {
    let message = "Something is wrong on the server side.";
    if (error.code === 1003 || error.code === 1006) {
      message = "The given location doesn't exist.";
    }
    return (
      <>
        <Search onSearchChange={handleOnSearchChange} />
        <label className="error-message">{message}</label>
      </>
    );
  }

  if (!forecast || !forecast.forecastday || forecast.forecastday.length === 0) {
    return null;
  }

  return (
    <>
      <Search onSearchChange={handleOnSearchChange} />
      <label className="city-name">{forecast.name}</label>
      <Accordion allowZeroExpanded allowMultipleExpanded>
        {forecast.forecastday.map((element) => (
          <AccordionItem key={element.date}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <span
                    className={`star ${element.favorite ? "filled" : ""}`}
                    onClick={(event) => handleToggleFavorite(event, element)}
                  >
                    &#9734;
                  </span>

                  <img
                    src={element.day.condition.icon}
                    className="icon-weather"
                    alt="weather"
                  />
                  <label className="date">{element.date}</label>
                  <label className="mititei-success">
                    Herculean-Proportions-Mititei-Success:{" "}
                    {herculeanPropotionsMititeiSuccessChance(
                      element.day.daily_chance_of_snow,
                      element.day.daily_chance_of_rain,
                      element.day.mintemp_c,
                      element.day.maxtemp_c
                    )}
                    %
                  </label>
                  <label className="status">{element.day.condition.text}</label>
                  <label className="min-max">
                    {" "}
                    {element.day.mintemp_c}°C / {element.day.maxtemp_c}°C{" "}
                  </label>
                </div>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <div className="daily-details-grid">
                <div className="daily-details-grid-item">
                  <label>Chance of rain:</label>
                  <label>{element.day.daily_chance_of_rain}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Precipitation (mm) :</label>
                  <label>{element.day.totalprecip_mm}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Chance of snow:</label>
                  <label>{element.day.daily_chance_of_snow}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Snow (cm):</label>
                  <label>{element.day.totalsnow_cm}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>Humidity:</label>
                  <label>{element.day.avghumidity}</label>
                </div>
                <div className="daily-details-grid-item">
                  <label>UV radiation:</label>
                  <label>{element.day.uv}</label>
                </div>
              </div>
            </AccordionItemPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
};

export default Forecast;
