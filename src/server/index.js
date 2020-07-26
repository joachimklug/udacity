var path = require('path');
const express = require('express');
const validatePlanTripParameter = require('./validators.js');
const weatherAPI = require('./weather');
const locations = require('./geolocations');
const picture = require('./pictures');

// Load environment variables
const dotenv = require('dotenv');
dotenv.config();
const SERVER_PORT = process.env.SERVER_PORT;
const DEBUG = Boolean(process.env.DEBUG);
const DEFAULT_PICTURE_URL = process.env.DEFAULT_PICTURE_URL;

// Start up an instance of app
const app = express();

//body-parser middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { exit } = require('process');
app.use(cors());

app.use(express.static('dist'));
console.log(__dirname);

// set listening port for application
app.listen(SERVER_PORT, function () {
  console.log(`App listening on port: ${SERVER_PORT}`);
});

// Server homepage
app.get('/', function (req, res) {
  res.sendFile(path.resolve('dist/index.html'));
});

// planTrip API
// Called when user clicks on frontend to plan trip
app.post('/planTrip', async (req, res) => {
  const payload = req.body;
  const inputValidation = validatePlanTripParameter(payload);

  if (inputValidation.isValid) {
    const { destination } = payload;

    // Get location information for entered destination
    const locationDetails = await locations
      .getLocationInfo(destination)
      .then((locationDetails) =>
        locationDetails.valid && locationDetails.response.totalResultsCount !== 0
          ? locationDetails.response.geonames[0]
          : false
      );

    if (locationDetails === false) {
      res.send({ valid: false, payload: 'Problems finding your destination' });
      return;
    }

    const longitude = locationDetails.lng;
    const latitude = locationDetails.lat;

    // Location details
    let text = await locations
      .getLocationText(payload.destination)
      .then((locationDetails) =>
        locationDetails.valid && locationDetails.response.geonames.length !== 0
          ? locationDetails.response.geonames[0]
          : false
      );

    if (!text) {
      text = {
        summary: 'No detailed text available',
        wikipediaUrl: '',
      };
    }

    // Get weather information for trip
    const weatherDetails = await weatherAPI
      .getWeather(longitude, latitude)
      .then((weatherData) => {
        if (!weatherData.valid || weatherData == undefined) {
          return false;
        }
        return weatherData.response.data.filter((day) =>
          new Date(day.valid_date).getTime() == new Date(payload.startDate).getTime() ? true : false
        );
      })
      .then((weatherData) => weatherData[0])
      .then((weatherData) => (weatherData == undefined ? 'No forecast possible' : weatherData.weather.description));

    if (weatherDetails === false) {
      res.send({ valid: false, payload: 'Weather data not valid' });
      return;
    }

    // Get image for location
    const image = await picture
      .getPicture(destination)
      .then((picture) =>
        picture.valid && picture.response.total !== 0 ? picture.response.hits[0].webformatURL : DEFAULT_PICTURE_URL
      );

    res.send({
      valid: true,
      payload: {
        weather: weatherDetails,
        imageURL: image,
        shortText: text.summary,
        shortTextMoreURL: text.wikipediaUrl,
      },
    });
  } else {
    // If input parameter are not valid return error
    res.send({ valid: false, payload: inputValidation.reason });
  }
});
