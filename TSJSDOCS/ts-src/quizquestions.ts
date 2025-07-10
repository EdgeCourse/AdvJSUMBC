/**
 * Represents a quiz question.
 * @typedef {Object} QuizQuestion
 * @property {string} question - The question text
 * @property {string[]} choices - Array of answer choices
 * @property {string} answer - The correct answer
 */
 interface QuizQuestion {
  question: string;
  choices: string[];
  answer: string;
}

/** @type {QuizQuestion[]} */
let quizData: QuizQuestion[] = [];

/**
 * Type guard for HTMLDivElement.
 * @param {Element | null} el
 * @returns {el is HTMLDivElement}
 */
function isDiv(el: Element | null): el is HTMLDivElement {
  return el instanceof HTMLDivElement;
}

// Load quiz data and render to DOM
fetch('/api/quiz')
  .then((res) => res.json())
  .then((data: QuizQuestion[]) => {
    quizData = data;
    renderQuiz(data);
  })
  .catch((err) => {
    console.error('Error loading quiz:', err);
  });

/**
 * Renders quiz questions as radio buttons.
 * @param {QuizQuestion[]} data - List of quiz questions to render
 */
function renderQuiz(data: QuizQuestion[]): void {
  const container = document.getElementById('quiz');
  if (!isDiv(container)) {
    console.error('Quiz container not found');
    return;
  }
  container.innerHTML = '';

  data.forEach((q, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('mb-4');

    const question = document.createElement('h5');
    question.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(question);

    q.choices.forEach((choice) => {
      const wrapper = document.createElement('div');
      wrapper.classList.add('form-check');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question-${index}`;
      input.value = choice;
      input.classList.add('form-check-input');
      input.id = `q${index}-${choice}`;

      const label = document.createElement('label');
      label.classList.add('form-check-label');
      label.setAttribute('for', input.id);
      label.textContent = choice;

      wrapper.appendChild(input);
      wrapper.appendChild(label);
      questionDiv.appendChild(wrapper);
    });

    container.appendChild(questionDiv);
  });
}
