export const setFavoriteStatus = (date, day, cityName) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  favorites[date] = { day, name: cityName };
  localStorage.setItem("favorites", JSON.stringify(favorites));
};

export const getFavoriteStatus = (date) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  return typeof favorites[date] !== "undefined" ? true : false;
};

export const getFavorites = () => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  return favorites;
};

export const deleteFavorite = (date) => {
  const favorites = JSON.parse(localStorage.getItem("favorites")) || {};
  if (typeof favorites[date] !== "undefined") {
    delete favorites[date];
  }
  localStorage.setItem("favorites", JSON.stringify(favorites));
  return favorites;
};
