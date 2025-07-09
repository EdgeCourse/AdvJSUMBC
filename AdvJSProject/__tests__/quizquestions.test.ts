import { describe, expect, test } from '@jest/globals';

interface QuizQuestion {
  question: string;
  choices: string[];
  answer: string;
}

describe('QuizQuestion structure', () => {
  test('question contains all fields', () => {
    const q: QuizQuestion = {
      question: 'What is 2 + 2?',
      choices: ['3', '4'],
      answer: '4'
    };

    expect(q.question).toBe('What is 2 + 2?');
    expect(q.choices).toContain('4');
    expect(q.answer).toBe('4');
  });
});
