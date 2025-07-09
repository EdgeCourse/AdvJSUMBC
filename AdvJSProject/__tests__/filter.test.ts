import { describe, expect, test } from '@jest/globals';

describe('Filter input logic', () => {
  test('filters text correctly', () => {
    const rows = [
      { text: 'apple' },
      { text: 'banana' },
      { text: 'grape' }
    ];

    const query = 'ap';
    const result = rows.filter(r => r.text.includes(query));
    expect(result).toHaveLength(2);
  });
});
