const validatePlanTripParameter = require('../validators.js');
const locations = require('../geolocations.js');

describe('Check validation of input parameter', () => {
  test('Does accept valid input parameter', () => {
    const validInputData = {
      destination: 'Paris',
      startDate: '2030-05-05',
      endDate: '2030-06-06',
    };
    expect(validatePlanTripParameter(validInputData).isValid).tobeTruthy;
  });

  test('Does not accept end before start date', () => {
    const validInputData = {
      destination: 'Paris',
      startDate: '2030-05-05',
      endDate: '2030-05-01',
    };
    expect(validatePlanTripParameter(validInputData).isValid).tobeFalsy;
  });

  test('Does not accept long destination name', () => {
    const validInputData = {
      destination: 'ThisIsAVeryLongDestinationWhichIsInvalid',
      startDate: '2030-05-05',
      endDate: '2030-06-06',
    };
    expect(validatePlanTripParameter(validInputData).isValid).tobeFalsy;
  });

  test('Does not accept empty destination', () => {
    const validInputData = {
      destination: ' ',
      startDate: '2030-05-05',
      endDate: '2030-06-06',
    };
    expect(validatePlanTripParameter(validInputData).isValid).tobeFalsy;
  });
});
