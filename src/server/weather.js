const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;

async function getWeather(longitude, latitude) {
  return axios
    .get(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&key=${WEATHERBIT_API_KEY}`)
    .then((response) => {
      return { valid: true, response: response.data };
    })
    .catch((error) => {
      return { valid: false, response: error };
    });
}

exports.getWeather = getWeather;
