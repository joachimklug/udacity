const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const PIXABY_API_KEY = process.env.PIXABY_API_KEY;

async function getPicture(keyword) {
  return axios
    .get(`https://pixabay.com/api/?key=${PIXABY_API_KEY}&q=${keyword}&image_type=photo`)
    .then((response) => {
      return { valid: true, response: response.data };
    })
    .catch((error) => {
      return { valid: false, response: error };
    });
}

exports.getPicture = getPicture;
