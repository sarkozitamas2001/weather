export const setFavoriteStatus = (date, day, cityName) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};

  if (typeof favorites[date] === "undefined") {
    favorites[date] = {};
  }
  favorites[date][cityName] = { day, name: cityName };
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavoriteStatus = (date, cityName) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  if (typeof favorites[date] === "undefined") {
    return false;
  }
  return typeof favorites[date][cityName] !== "undefined" ? true : false;
};

export const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  return favorites;
};

export const deleteFavorite = (date, cityName) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  if (typeof favorites[date] !== "undefined") {
    delete favorites[date][cityName];
    if (Object.keys(favorites[date]).length === 0) {
      delete favorites[date];
    }
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  return favorites;
};
