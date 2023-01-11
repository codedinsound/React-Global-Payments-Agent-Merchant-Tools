import Utils from '../Utils';

// Test Date Function in Utils in order to get correct date
test('Test if todays date is the correct date', () => {
  expect(Utils.getTodaysDate()).toBe('1-11-2023');
});
