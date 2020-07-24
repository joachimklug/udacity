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

export { daysBetween, showError };
