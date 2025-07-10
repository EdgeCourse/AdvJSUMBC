// === Unique hidden symbol for internal question ID ===
const QUESTION_ID = Symbol('questionId');

// === Maps and Metadata ===
const editTracker = new Map(); // Tracks number of edits per question
const questionMeta = new WeakMap(); // Stores last edited by (e.g., 'Admin')

// === Wraps question object with Proxy ===
function wrapQuestion(q) {
  const wrapped = {
    ...q,
    [QUESTION_ID]: crypto.randomUUID?.() || Math.random().toString(36).slice(2)
  };

  return new Proxy(wrapped, {
    get(target, prop) {
      return Reflect.get(target, prop);
    },
    set(target, prop, value) {
      console.log(`✏️ Admin editing ${String(prop)}: ${target[prop]} → ${value}`);
      editTracker.set(target, (editTracker.get(target) || 0) + 1);
      questionMeta.set(target, { editedBy: 'Admin', timestamp: Date.now() });
      return Reflect.set(target, prop, value);
    }
  });
}

// === Type guards ===
function isInput(el) {
  return el instanceof HTMLInputElement;
}
function isForm(el) {
  return el instanceof HTMLFormElement;
}
function isDiv(el) {
  return el instanceof HTMLDivElement;
}

// === Utility for safe element lookup ===
function getElement(id) {
  const el = document.getElementById(id);
  if (!el) throw new Error(`Element with ID '${id}' not found.`);
  return el;
}

// === Main Data Array ===
let quizData = [];

// === Load quiz data and wrap ===
fetch('/api/quiz')
  .then(res => res.json())
  .then(data => {
    quizData = data.map(wrapQuestion);
    renderQuizAdmin();
  })
  .catch(err => {
    console.error('Failed to load quiz:', err);
  });

// === Render editable quiz questions ===
function renderQuizAdmin() {
  const listDiv = getElement('quiz-admin-list');
  listDiv.innerHTML = '';

  quizData.forEach((q, index) => {
    const div = document.createElement('div');
    div.className = 'border p-3 mb-3';

    // Editable Question
    const questionInput = document.createElement('input');
    questionInput.type = 'text';
    questionInput.className = 'form-control mb-2';
    questionInput.value = q.question;
    questionInput.oninput = () => {
      quizData[index].question = questionInput.value;
    };
    div.appendChild(questionInput);

    // Editable Choices
    const choicesInput = document.createElement('input');
    choicesInput.type = 'text';
    choicesInput.className = 'form-control mb-2';
    choicesInput.value = q.choices.join(', ');
    choicesInput.oninput = () => {
      quizData[index].choices = choicesInput.value.split(',').map(c => c.trim());
    };
    div.appendChild(choicesInput);

    // Editable Answer
    const answerInput = document.createElement('input');
    answerInput.type = 'text';
    answerInput.className = 'form-control mb-2';
    answerInput.value = q.answer;
    answerInput.oninput = () => {
      quizData[index].answer = answerInput.value.trim();
    };
    div.appendChild(answerInput);

    // Delete Button
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

  // Save Button
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

// === Handle adding a new question ===
const addForm = document.getElementById('add-question-form');
if (isForm(addForm)) {
  addForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const questionEl = document.getElementById('new-question');
    const choicesEl = document.getElementById('new-choices');
    const answerEl = document.getElementById('new-answer');

    const question = questionEl?.value.trim() ?? '';
    const choicesInput = choicesEl?.value.trim() ?? '';
    const answer = answerEl?.value.trim() ?? '';

    const choices = choicesInput.split(',').map(c => c.trim()).filter(Boolean);

    if (!question || choices.length < 2 || !answer) {
      alert('Please enter a question, at least 2 choices, and an answer.');
      return;
    }

    const newQ = wrapQuestion({ question, choices, answer });
    quizData.push(newQ);
    renderQuizAdmin();

    if (questionEl) questionEl.value = '';
    if (choicesEl) choicesEl.value = '';
    if (answerEl) answerEl.value = '';
  });
} else {
  console.error('Add-question form not found.');
}
