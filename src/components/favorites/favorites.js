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

  const handleFavoriteDeletion = (event, date, city) => {
    event.stopPropagation();
    const newFavorites = deleteFavorite(date, city);
    setFavorites(newFavorites);
  };

  if (!favorites || Object.keys(favorites).length === 0) {
    return (
      <>
        <label className="favorite-message">
          You have no days marked as favorite!
        </label>
      </>
    );
  }
  return (
    <>
      <Accordion allowZeroExpanded allowMultipleExpanded>
        {Object.entries(favorites).map(([date, element]) =>
          Object.entries(element).map(([city, item]) => (
            <AccordionItem key={date}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  <div className="daily-item">
                    <span
                      className="favorite-deletion"
                      onClick={(event) =>
                        handleFavoriteDeletion(event, date, city)
                      }
                    >
                      &#10005;
                    </span>

                    <img
                      src={item.day.condition.icon}
                      className="icon-weather"
                      alt="weather"
                    />
                    <label className="date">{date}</label>
                    <label className="mititei-success">
                      Herculean-Proportions-Mititei-Success:{" "}
                      {herculeanPropotionsMititeiSuccessChance(
                        item.day.daily_chance_of_snow,
                        item.day.daily_chance_of_rain,
                        item.day.mintemp_c,
                        item.day.maxtemp_c
                      )}
                      %
                    </label>
                    <label className="status">{item.day.condition.text}</label>
                    <label className="min-max">
                      {" "}
                      {item.day.mintemp_c}°C / {item.day.maxtemp_c}°C{" "}
                    </label>
                    <label className="city-name-favorite">{city}</label>
                  </div>
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                <div className="daily-details-grid">
                  <div className="daily-details-grid-item">
                    <label>Chance of rain:</label>
                    <label>{item.day.daily_chance_of_rain}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Precipitation (mm) :</label>
                    <label>{item.day.totalprecip_mm}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Chance of snow:</label>
                    <label>{item.day.daily_chance_of_snow}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Snow (cm):</label>
                    <label>{item.day.totalsnow_cm}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>Humidity:</label>
                    <label>{item.day.avghumidity}</label>
                  </div>
                  <div className="daily-details-grid-item">
                    <label>UV radiation:</label>
                    <label>{item.day.uv}</label>
                  </div>
                </div>
              </AccordionItemPanel>
            </AccordionItem>
          ))
        )}
      </Accordion>
    </>
  );
};

export default Favorites;
