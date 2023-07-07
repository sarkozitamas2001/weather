import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchForecast = async (city = "Cluj-Napoca") => {
  try {
    const response = await axios.get(`${apiUrl}/forecast.json`, {
      params: {
        q: city,
        days: "7",
        tp: 24,
      },
      headers: {
        key: apiKey,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
