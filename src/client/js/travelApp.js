// #########
// This js file is holds all procedures required for running the travel app service of this site.
// #########

async function planTrip(event) {
  event.preventDefault();

  // Variable declaration
  const today = new Date();
  const resultContainer = document.querySelector('#resultContainer');
  const destination = document.querySelector('#destination').value;
  const startDate = new Date(document.querySelector('#start').value);
  const endDate = new Date(document.querySelector('#end').value);
  let tripDetailsRaw = false;

  // Fetch data from backend
  try {
    tripDetailsRaw = await fetch('http://localhost:8081/planTrip', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        destination: destination,
        startDate: startDate,
        endDate: endDate,
      }),
    });
  } catch {
    Client.showError('Not able to fetch data from backend.');
  }

  const tripDetails = await tripDetailsRaw.json();

  // If backen call provides valid data show these as container in the FE. Otherwise print an error with error message
  if (!tripDetails.valid) {
    Client.showError(tripDetails.payload);
  } else {
    const tripData = {
      cityName: destination,
      startDate: startDate,
      startsIn: Client.daysBetween(today, startDate),
      duration: Client.daysBetween(startDate, endDate),
      weather: tripDetails.payload.weather,
      imageURL: tripDetails.payload.imageURL,
      shortText: tripDetails.payload.shortText,
    };
    resultContainer.insertAdjacentElement('afterbegin', Client.createResultElement(tripData));
    Client.showError('');
  }
}

export { planTrip };
