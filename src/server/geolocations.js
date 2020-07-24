const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const GEONAMES_USER = process.env.GEONAMES_USER;

async function getLocationInfo(location) {
  return axios
    .get(`http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${GEONAMES_USER}`)
    .then((response) => {
      return { valid: true, response: response.data };
    })
    .catch((error) => {
      return { valid: false, response: error };
    });
}

async function getLocationText(location) {
  return {
    location: location,
    shortText: `${location} is lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris mollis iaculis nibh nec dignissim. Donec ultricies nulla convallis sodales eleifend. Nam non maximus erat, a fermentum justo.`,
  };
}

exports.getLocationInfo = getLocationInfo;
exports.getLocationText = getLocationText;
