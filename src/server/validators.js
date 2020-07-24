const MAX_DESTINATION_LENGTH = 15;

function validatePlanTripParameter(payload) {
  if (payload.destination.length > MAX_DESTINATION_LENGTH) {
    return { isValid: false, reason: `Destination has too many characters. Allowed: ${MAX_DESTINATION_LENGTH}` };
  } else if (payload.destination.trim().length === 0) {
    return { isValid: false, reason: `Destination is not allowed to be empty` };
  } else if (new Date(payload.startDate).getTime() >= new Date(payload.endDate).getTime()) {
    return { isValid: false, reason: `Start and End date combination invalid` };
  } else if (new Date(payload.startDate).getTime() < new Date().getTime()) {
    return { isValid: false, reason: `Start date in the past or today` };
  }
  return { isValid: true, reason: '' };
}

module.exports = validatePlanTripParameter;
