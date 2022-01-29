import { randomwPassword } from '../models/Static';

describe('Password', () => {
  test.only('generate a random password of 10 chracters', () => {
    expect(randomwPassword().length).toBe(10);
  });
});
