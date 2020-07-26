function daysBetween(date1, date2) {
  return Math.ceil((date2 - date1) / (1000 * 60 * 60 * 24));
}

function showError(errorMessage) {
  const errorMessageElement = document.querySelector('.errorMessage');
  if (errorMessage == '' && errorMessageElement) {
    errorMessageElement.remove();
  } else if (errorMessage != '' && errorMessageElement) {
    errorMessageElement.innerText = `ERROR: ${errorMessage}`;
  } else if (errorMessage != '' && !errorMessageElement) {
    const planTripContainer = document.querySelector('.trip-planner-container');
    const errorElement = document.createElement('div');
    errorElement.className = 'errorMessage';
    errorElement.innerText = `ERROR: ${errorMessage}`;
    planTripContainer.appendChild(errorElement);
  }
}

function styleToScreenSize() {
  const tripResultContainer = document.querySelector('.trip-result-container');
  const allTripResultContainer = document.querySelectorAll('.trip-result-container');
  const allTripResultPics = document.querySelectorAll('.trip-result-pic');
  if (tripResultContainer.clientWidth < 680) {
    allTripResultContainer.forEach((container) => container.classList.add('trip-result-container-small'));
    allTripResultPics.forEach((container) => container.classList.add('trip-result-pic-small'));
  } else {
    allTripResultContainer.forEach((container) => container.classList.remove('trip-result-container-small'));
    allTripResultPics.forEach((container) => container.classList.remove('trip-result-pic-small'));
  }
}

export { daysBetween, showError, styleToScreenSize };
