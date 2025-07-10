var quizData = [];
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
    var el = document.getElementById(id);
    if (!el)
        throw new Error("Element with ID '".concat(id, "' not found."));
    return el;
}
// Load quiz data from API
fetch('/api/quiz')
    .then(function (res) { return res.json(); })
    .then(function (data) {
    quizData = data;
    renderQuizAdmin();
})
    .catch(function (err) {
    console.error('Failed to load quiz:', err);
});
function renderQuizAdmin() {
    var listDiv = getElement('quiz-admin-list');
    listDiv.innerHTML = '';
    quizData.forEach(function (q, index) {
        var div = document.createElement('div');
        div.className = 'border p-3 mb-3';
        // Editable Question
        var questionInput = document.createElement('input');
        questionInput.type = 'text';
        questionInput.className = 'form-control mb-2';
        questionInput.value = q.question;
        questionInput.oninput = function () {
            quizData[index].question = questionInput.value;
        };
        div.appendChild(questionInput);
        // Editable Choices
        var choicesInput = document.createElement('input');
        choicesInput.type = 'text';
        choicesInput.className = 'form-control mb-2';
        choicesInput.value = q.choices.join(', ');
        choicesInput.oninput = function () {
            quizData[index].choices = choicesInput.value.split(',').map(function (c) { return c.trim(); });
        };
        div.appendChild(choicesInput);
        // Editable Answer
        var answerInput = document.createElement('input');
        answerInput.type = 'text';
        answerInput.className = 'form-control mb-2';
        answerInput.value = q.answer;
        answerInput.oninput = function () {
            quizData[index].answer = answerInput.value.trim();
        };
        div.appendChild(answerInput);
        // Delete Button
        var delBtn = document.createElement('button');
        delBtn.className = 'btn btn-danger btn-sm';
        delBtn.textContent = 'Delete';
        delBtn.onclick = function () {
            quizData.splice(index, 1);
            renderQuizAdmin();
        };
        div.appendChild(delBtn);
        listDiv.appendChild(div);
    });
    // Save All Button
    var saveBtn = document.createElement('button');
    saveBtn.textContent = 'Save All Changes';
    saveBtn.className = 'btn btn-primary mt-3';
    saveBtn.onclick = function () {
        fetch('/api/quiz', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(quizData)
        })
            .then(function (res) { return res.json(); })
            .then(function (data) {
            alert(data.message || 'Saved!');
        })
            .catch(function (err) {
            console.error('Save failed:', err);
            alert('Failed to save changes.');
        });
    };
    listDiv.appendChild(saveBtn);
}
// Add new question form
var addForm = document.getElementById('add-question-form');
if (isForm(addForm)) {
    addForm.addEventListener('submit', function (e) {
        var _a, _b, _c;
        e.preventDefault();
        var questionEl = document.getElementById('new-question');
        var choicesEl = document.getElementById('new-choices');
        var answerEl = document.getElementById('new-answer');
        var question = (_a = questionEl === null || questionEl === void 0 ? void 0 : questionEl.value.trim()) !== null && _a !== void 0 ? _a : '';
        var choicesInput = (_b = choicesEl === null || choicesEl === void 0 ? void 0 : choicesEl.value.trim()) !== null && _b !== void 0 ? _b : '';
        var answer = (_c = answerEl === null || answerEl === void 0 ? void 0 : answerEl.value.trim()) !== null && _c !== void 0 ? _c : '';
        var choices = choicesInput.split(',').map(function (c) { return c.trim(); }).filter(Boolean);
        if (!question || choices.length < 2 || !answer) {
            alert('Please enter a question, at least 2 choices, and an answer.');
            return;
        }
        quizData.push({ question: question, choices: choices, answer: answer });
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
