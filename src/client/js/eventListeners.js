const submitButton = document.querySelector('#planTripButton');

submitButton.addEventListener('click', () => Client.planTrip(event));
window.addEventListener('resize', () => Client.styleToScreenSize());
