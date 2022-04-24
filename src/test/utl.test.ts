import Util from '../utils/Util';

describe('is empty check', () => {
  test('has isEmpty method', () => {
    expect(Util.hasStaticMethod('isEmpty')).toBe(true);
  });

  describe('Array', () => {
    test('is empty check on a empty array should return true', () => {
      const array1: string[] = [];
      expect(Util.isEmpty<Array<string>>(array1)).toBe(true);
    });
    test('is empty check on a non-empty array should return false', () => {
      const array1: string[] = ['Apple'];
      expect(Util.isEmpty<Array<string>>(array1)).toBe(false);
    });
  });
  describe('string', () => {
    test('is empty check on a empty string should return true', () => {
      const st = '';
      expect(Util.isEmpty<string>(st)).toBe(true);
    });
    test('is empty check on a non-string string should return false', () => {
      const st = 'Apple';
      expect(Util.isEmpty<string>(st)).toBe(false);
    });
  });
  describe('undefined', () => {
    test('is empty check on a undefined should return true', () => {
      let st;
      expect(Util.isEmpty<undefined>(st)).toBe(true);
    });
  });
  describe('null', () => {
    test('is empty check on a null should return true', () => {
      const st = null;
      expect(Util.isEmpty<null>(st)).toBe(true);
    });
  });
  describe('Object', () => {
    test('is empty check on a empty object should return true', () => {
      const st = {};
      expect(Util.isEmpty<object>(st)).toBe(true);
    });
    test('is empty check on a non-empty object should return false', () => {
      const st = { name: 'Apple' };
      expect(Util.isEmpty<object>(st)).toBe(false);
    });

  });
});
