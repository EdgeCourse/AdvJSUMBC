interface Question {
  question: string;
  choices: string[];
  answer: string;
}

let quizData: Question[] = [];

// Load quiz data from API
fetch('/api/quiz')
  .then(res => res.json())
  .then((data: Question[]) => {
    quizData = data;
    renderQuizAdmin();
  })
  .catch(err => {
    console.error('Failed to load quiz:', err);
  });

function renderQuizAdmin(): void {
  const listDiv = document.getElementById('quiz-admin-list');
  if (!listDiv) return;

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
      quizData[index].choices = choicesInput.value
        .split(',')
        .map(c => c.trim())
        .filter(c => c);
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

  // Save All Button
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

// Add new question
const addForm = document.getElementById('add-question-form') as HTMLFormElement | null;

addForm?.addEventListener('submit', function (e: Event) {
  e.preventDefault();

  const questionInput = document.getElementById('new-question') as HTMLInputElement | null;
  const choicesInputEl = document.getElementById('new-choices') as HTMLInputElement | null;
  const answerInput = document.getElementById('new-answer') as HTMLInputElement | null;

  const question = questionInput?.value.trim() || '';
  const choicesRaw = choicesInputEl?.value.trim() || '';
  const answer = answerInput?.value.trim() || '';

  const choices = choicesRaw.split(',').map(c => c.trim()).filter(c => c);

  if (!question || choices.length < 2 || !answer) {
    alert('Please enter a question, at least 2 choices, and an answer.');
    return;
  }

  quizData.push({ question, choices, answer });
  renderQuizAdmin();
  addForm.reset();
});
