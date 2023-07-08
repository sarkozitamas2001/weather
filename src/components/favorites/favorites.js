import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemButton,
  AccordionItemHeading,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "./favorites.css";

import { getFavorites, deleteFavorite } from "../../utils/localStorageHelpers";
import { herculeanPropotionsMititeiSuccessChance } from "../../utils/successfulBBQ";

const Favorites = () => {
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  const handleFavoriteDeletion = (event, date) => {
    event.stopPropagation();
    const newFavorites = deleteFavorite(date);
    setFavorites(newFavorites);
  };

  if (!favorites || Object.keys(favorites).length === 0) {
    return null;
  }

  return (
    <>
      <Accordion allowZeroExpanded allowMultipleExpanded>
        {Object.entries(favorites).map(([date, element]) => (
          <AccordionItem key={date}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <div className="daily-item">
                  <span
                    className="favorite-deletion"
                    onClick={(event) => handleFavoriteDeletion(event, date)}
                  >
                    &#10005;
                  </span>

                  <img
                    src={element.day.condition.icon}
                    className="icon-weather"
                    alt="weather"
                  />
                  <label className="date">{date}</label>
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
                  <label className="city-name-favorite">{element.name}</label>
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

export default Favorites;
