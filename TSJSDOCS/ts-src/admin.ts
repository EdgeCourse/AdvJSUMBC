/**
 * Represents a quiz question.
 * @typedef {Object} QuizQuestion
 * @property {string} question - The text of the quiz question.
 * @property {string[]} choices - List of possible answer choices.
 * @property {string} answer - The correct answer.
 */
 interface QuizQuestion {
    question: string;
    choices: string[];
    answer: string;
  }
  
  /** @type {QuizQuestion[]} Holds all loaded or modified quiz data. */
  let quizData: QuizQuestion[] = [];
  
  /**
   * Checks if an element is an HTMLInputElement.
   * @param {Element | null} el
   * @returns {el is HTMLInputElement}
   */
  function isInput(el: Element | null): el is HTMLInputElement {
    return el instanceof HTMLInputElement;
  }
  
  /**
   * Checks if an element is an HTMLFormElement.
   * @param {Element | null} el
   * @returns {el is HTMLFormElement}
   */
  function isForm(el: Element | null): el is HTMLFormElement {
    return el instanceof HTMLFormElement;
  }
  
  /**
   * Checks if an element is an HTMLDivElement.
   * @param {Element | null} el
   * @returns {el is HTMLDivElement}
   */
  function isDiv(el: Element | null): el is HTMLDivElement {
    return el instanceof HTMLDivElement;
  }
  
  /**
   * Gets a DOM element by ID and asserts its type.
   * @template T
   * @param {string} id - Element ID
   * @returns {T} - Typed HTML element
   * @throws Will throw an error if element is not found
   */
  function getElement<T extends HTMLElement>(id: string): T {
    const el = document.getElementById(id);
    if (!el) throw new Error(`Element with ID '${id}' not found.`);
    return el as T;
  }
  
  // Load quiz data from the server and render it
  fetch('/api/quiz')
    .then(res => res.json())
    .then((data: QuizQuestion[]) => {
      quizData = data;
      renderQuizAdmin();
    })
    .catch(err => {
      console.error('Failed to load quiz:', err);
    });
  
  /**
   * Renders the quiz admin panel: editable questions, choices, and answers.
   */
  function renderQuizAdmin(): void {
    const listDiv = getElement<HTMLDivElement>('quiz-admin-list');
    listDiv.innerHTML = '';
  
    quizData.forEach((q, index) => {
      const div = document.createElement('div');
      div.className = 'border p-3 mb-3';
  
      /** Editable Question */
      const questionInput = document.createElement('input');
      questionInput.type = 'text';
      questionInput.className = 'form-control mb-2';
      questionInput.value = q.question;
      questionInput.oninput = () => {
        quizData[index].question = questionInput.value;
      };
      div.appendChild(questionInput);
  
      /** Editable Choices (comma-separated) */
      const choicesInput = document.createElement('input');
      choicesInput.type = 'text';
      choicesInput.className = 'form-control mb-2';
      choicesInput.value = q.choices.join(', ');
      choicesInput.oninput = () => {
        quizData[index].choices = choicesInput.value.split(',').map(c => c.trim());
      };
      div.appendChild(choicesInput);
  
      /** Editable Answer */
      const answerInput = document.createElement('input');
      answerInput.type = 'text';
      answerInput.className = 'form-control mb-2';
      answerInput.value = q.answer;
      answerInput.oninput = () => {
        quizData[index].answer = answerInput.value.trim();
      };
      div.appendChild(answerInput);
  
      /** Delete Button */
      const delBtn = document.createElement('button');
      delBtn.className = 'btn btn-danger btn-sm';
      delBtn.textContent = 'Delete';
      delBtn.onclick = () => {
        quizData.splice(index, 1);
        renderQuizAdmin();
      };
      div.appendChild(delBtn);
  
      listDiv.appendChild(div);
    });
  
    /** Save All Changes Button */
    const saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save All Changes';
    saveBtn.className = 'btn btn-primary mt-3';
    saveBtn.onclick = () => {
      fetch('/api/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(quizData)
      })
        .then(res => res.json())
        .then(data => {
          alert(data.message || 'Saved!');
        })
        .catch(err => {
          console.error('Save failed:', err);
          alert('Failed to save changes.');
        });
    };
    listDiv.appendChild(saveBtn);
  }
  
  // Add new question form logic
  const addForm = document.getElementById('add-question-form');
  if (isForm(addForm)) {
    addForm.addEventListener('submit', function (e: Event) {
      e.preventDefault();
  
      const questionEl = document.getElementById('new-question') as HTMLInputElement | null;
      const choicesEl = document.getElementById('new-choices') as HTMLInputElement | null;
      const answerEl = document.getElementById('new-answer') as HTMLInputElement | null;
  
      const question = questionEl?.value.trim() ?? '';
      const choicesInput = choicesEl?.value.trim() ?? '';
      const answer = answerEl?.value.trim() ?? '';
      const choices = choicesInput.split(',').map(c => c.trim()).filter(Boolean);
  
      if (!question || choices.length < 2 || !answer) {
        alert('Please enter a question, at least 2 choices, and an answer.');
        return;
      }
  
      quizData.push({ question, choices, answer });
      renderQuizAdmin();
  
      if (questionEl) questionEl.value = '';
      if (choicesEl) choicesEl.value = '';
      if (answerEl) answerEl.value = '';
    });
  } else {
    console.error('Add-question form not found.');
  }
  
