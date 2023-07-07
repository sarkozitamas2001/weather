import React, { useEffect, useState } from "react";
import { fetchForecast } from "../api/api.js";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./forecast.css";

const Forecast = () => {
  const [forecast, setForecast] = useState([]);

  useEffect(() => {
    const fetchForecastAsync = async () => {
      try {
        const response = await fetchForecast();
        const { country, name } = response.location;

        setForecast({
          country,
          name,
          forecastday: [...response.forecast.forecastday],
        });
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchForecastAsync();
  }, []);

  useEffect(() => {
    if (forecast && forecast.forecastday && forecast.forecastday.length > 0) {
      forecast.forecastday.forEach((element) => {
        console.log(element.day.avgtemp_c);
      });
    }
  }, [forecast]);

  if (!forecast || !forecast.forecastday || forecast.forecastday.length === 0) {
    return null;
  }

  return (
    <>
      <label className="city-name">{forecast.name}</label>
      <Accordion allowZeroExpanded>
        {forecast.forecastday.map((element) => (
          <AccordionItem key={element.date}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <img
                    src={element.day.condition.icon}
                    className="icon-weather"
                    alt="weather"
                  />
                  <label className="date">{element.date}</label>
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
