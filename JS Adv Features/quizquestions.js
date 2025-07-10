// === Data Structures ===

// Prevents duplicate questions
const questionSet = new Set();

// Generator for unique question IDs (q-1, q-2, etc.)
function* idGen() {
  let id = 1;
  while (true) yield `q-${id++}`;
}
const generateId = idGen();

// === Main Quiz Data ===
let quizData = [];

// === Type Guard ===
function isDiv(el) {
  return el instanceof HTMLDivElement;
}

// === Enhancer: Adds ID, prevents duplicates, enables iteration ===
function enhanceQuestions(data) {
  return data
    .filter(q => !questionSet.has(q.question)) // skip duplicates
    .map(q => {
      questionSet.add(q.question);
      const enhanced = {
        ...q,
        id: generateId.next().value,
        [Symbol.iterator]: function* () {
          yield this.question;
          yield* this.choices;
          yield this.answer;
        }
      };
      return enhanced;
    });
}

// === Load and Render Quiz ===
fetch('/api/quiz')
  .then(res => res.json())
  .then(data => {
    quizData = enhanceQuestions(data);
    renderQuiz(quizData);
  })
  .catch(err => {
    console.error('Error loading quiz:', err);
  });

// === Render Quiz on Page ===
function renderQuiz(data) {
  const container = document.getElementById('quiz');
  if (!isDiv(container)) {
    console.error('Quiz container not found');
    return;
  }

  container.innerHTML = ''; // Clear previous

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

  const submitBtn = document.createElement('button');
  submitBtn.textContent = 'Submit';
  submitBtn.classList.add('btn', 'btn-success', 'mt-3');
  submitBtn.onclick = handleSubmit;
  container.appendChild(submitBtn);
}

// === Handle Quiz Submission ===
function handleSubmit() {
  let correctCount = 0;

  quizData.forEach((q, index) => {
    const selected = document.querySelector(`input[name="question-${index}"]:checked`)?.value;
    if (selected === q.answer) {
      correctCount++;
    }
  });

  alert(`You got ${correctCount} out of ${quizData.length} correct!`);
}
