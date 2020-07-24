const helperFunctions = require('../js/helperFunctions.js');

describe('helperFunctions working as expected', () => {
  test('daysBetween does return correct value', () => {
    expect(helperFunctions.daysBetween(new Date('2020', '01', '01'), new Date('2020', '01', '31'))).toEqual(30);
  });
});
