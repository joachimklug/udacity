// #########
// Creates the resulting container which will be shown on the FE.
// Receives as input parameter all veriables required to display individual values.
// #########

function createResultElement({
  cityName,
  startDate,
  startsIn,
  duration,
  weather,
  imageURL,
  shortText,
  ...unusedValues
}) {
  const resultElement = document.createElement('div');
  resultElement.classList = 'trip-result-container';

  // Construct left side Picture
  // const picture = document.createElement('img');
  // picture.setAttribute('src', `${imageURL}`);
  // picture.classList = 'trip-result-pic';
  const picture = document.createElement('div');
  picture.style.backgroundImage = `url(${imageURL})`;
  picture.classList = 'trip-result-pic-2';

  // Construct link bar in the middle
  const linkBar = `<div class="trip-result-icons">
                        <i class="fab fa-facebook-square"></i>
                        <i class="fab fa-twitter-square"></i>
                        <i class="fab fa-instagram-square"></i>
                        <i class="fab fa-snapchat-square"></i>
                    </div>`;

  // Construct the title including like function
  const title = document.createElement('div');
  title.classList = 'trip-result-title';
  const titleCityName = document.createElement('h2');
  titleCityName.innerText = cityName;
  titleCityName.classList = 'trip-target';
  const favIcon = `<i class="far fa-heart favicon"></i>`;
  title.appendChild(titleCityName);
  title.insertAdjacentHTML('beforeend', favIcon);

  // Construct the body including weather information and trip data
  const resultInfo = document.createElement('div');
  resultInfo.classList = 'trip-result-info';
  const tripStart = document.createElement('div');
  tripStart.innerText = `Trip starts in: ${startsIn} days on ${startDate.toLocaleDateString()}`;
  const tripDuration = document.createElement('div');
  tripDuration.innerText = `Trip duration: ${duration} days`;
  const tripWeather = document.createElement('div');
  tripWeather.innerText = `Weather at arrival: ${weather}`;
  resultInfo.appendChild(tripStart);
  resultInfo.appendChild(tripDuration);
  resultInfo.appendChild(tripWeather);

  // Construct the "more details" section for the trip
  const cityDetails = document.createElement('div');
  cityDetails.classList = 'trip-result-more';
  const detailsText = document.createElement('div');
  detailsText.innerText = `${shortText}`;
  const linkForMore = document.createElement('a');
  linkForMore.classList = 'more-button';
  linkForMore.innerText = '[...continue reading]';
  cityDetails.appendChild(detailsText);
  cityDetails.appendChild(linkForMore);

  // Stitch together all created componenets
  resultElement.appendChild(picture);
  resultElement.insertAdjacentHTML('beforeend', linkBar);
  resultElement.appendChild(title);
  resultElement.appendChild(resultInfo);
  resultElement.appendChild(cityDetails);

  return resultElement;
}

export { createResultElement };
