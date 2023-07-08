import React, { useState } from "react";
import "./App.css";
import Forecast from "./components/forecast/forecast";
import Favorites from "./components/favorites/favorites";

function App() {
  const [selectedTab, setSelectedTab] = useState("forecast");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  return (
    <div className="container">
      <div className="tabs">
        <button
          className={`tab ${selectedTab === "forecast" ? "active" : ""}`}
          onClick={() => handleTabClick("forecast")}
        >
          Forecast
        </button>
        <span className="tab-button-selector"> | </span>
        <button
          className={`tab ${selectedTab === "favorites" ? "active" : ""}`}
          onClick={() => handleTabClick("favorites")}
        >
          Favorites
        </button>
      </div>
      <div className="content">
        {selectedTab === "forecast" ? <Forecast /> : <Favorites />}
      </div>
    </div>
  );
}

export default App;
