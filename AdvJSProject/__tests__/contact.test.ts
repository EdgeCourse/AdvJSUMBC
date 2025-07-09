import { describe, expect, test } from '@jest/globals';

function validateZip(zip: string) {
  return /^\d{5}$/.test(zip);
}

function validatePhone(phone: string) {
  return /^\d{10}$/.test(phone);
}

describe('Contact form validation', () => {
  test('validates zip code', () => {
    expect(validateZip('12345')).toBe(true);
    expect(validateZip('abcde')).toBe(false);
  });

  test('validates phone number', () => {
    expect(validatePhone('1234567890')).toBe(true);
    expect(validatePhone('123')).toBe(false);
  });
});
