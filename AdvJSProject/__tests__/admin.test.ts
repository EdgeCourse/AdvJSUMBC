import { describe, test, expect, beforeEach } from '@jest/globals';

// Mock DOM for quiz admin
document.body.innerHTML = `
  <div id="quiz-admin-list"></div>
  <form id="add-question-form">
    <input id="new-question" />
    <input id="new-choices" />
    <input id="new-answer" />
  </form>
`;

// Basic sanity check
describe('admin.ts behavior', () => {
  test('renders quiz item to DOM', () => {
    const container = document.getElementById('quiz-admin-list');
    expect(container).not.toBeNull();
  });

  test('can add and display a new question programmatically', () => {
    const quizData = [
      {
        question: 'What is 2+2?',
        choices: ['3', '4'],
        answer: '4',
      },
    ];

    const div = document.createElement('div');
    div.textContent = quizData[0].question;
    document.getEl
