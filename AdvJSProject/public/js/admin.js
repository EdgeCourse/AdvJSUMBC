"use strict";
let quizData = [];
/** Type guard for HTMLInputElement */
function isInput(el) {
    return el instanceof HTMLInputElement;
}
/** Type guard for HTMLFormElement */
function isForm(el) {
    return el instanceof HTMLFormElement;
}
/** Type guard for HTMLDivElement */
function isDiv(el) {
    return el instanceof HTMLDivElement;
}
/** Get required element and assert type */
function getElement(id) {
    const el = document.getElementById(id);
    if (!el)
        throw new Error(`Element with ID '${id}' not found.`);
    return el;
}
// Load quiz data from API
fetch('/api/quiz')
    .then(res => res.json())
    .then((data) => {
    quizData = data;
    renderQuizAdmin();
})
    .catch(err => {
    console.error('Failed to load quiz:', err);
});
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
// Add new question form
const addForm = document.getElementById('add-question-form');
if (isForm(addForm)) {
    addForm.addEventListener('submit', function (e) {
        var _a, _b, _c;
        e.preventDefault();
        const questionEl = document.getElementById('new-question');
        const choicesEl = document.getElementById('new-choices');
        const answerEl = document.getElementById('new-answer');
        const question = (_a = questionEl === null || questionEl === void 0 ? void 0 : questionEl.value.trim()) !== null && _a !== void 0 ? _a : '';
        const choicesInput = (_b = choicesEl === null || choicesEl === void 0 ? void 0 : choicesEl.value.trim()) !== null && _b !== void 0 ? _b : '';
        const answer = (_c = answerEl === null || answerEl === void 0 ? void 0 : answerEl.value.trim()) !== null && _c !== void 0 ? _c : '';
        const choices = choicesInput.split(',').map(c => c.trim()).filter(Boolean);
        if (!question || choices.length < 2 || !answer) {
            alert('Please enter a question, at least 2 choices, and an answer.');
            return;
        }
        quizData.push({ question, choices, answer });
        renderQuizAdmin();
        if (questionEl)
            questionEl.value = '';
        if (choicesEl)
            choicesEl.value = '';
        if (answerEl)
            answerEl.value = '';
    });
}
else {
    console.error('Add-question form not found.');
}
