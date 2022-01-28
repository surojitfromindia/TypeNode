import { unqiueNumber } from '../models/Static';

test('Unique number is not equal to another unique numbe', () => {
  expect(unqiueNumber()).not.toBe(unqiueNumber());
});

test('Unique number length is equal or less than to 11', () => {
  expect(unqiueNumber().toString().length).toBeLessThan(11);
});
