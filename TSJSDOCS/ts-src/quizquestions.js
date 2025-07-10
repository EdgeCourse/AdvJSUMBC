var quizData = [];
function isDiv(el) {
    return el instanceof HTMLDivElement;
}
fetch('/api/quiz')
    .then(function (res) { return res.json(); })
    .then(function (data) {
    quizData = data;
    renderQuiz(data);
})
    .catch(function (err) {
    console.error('Error loading quiz:', err);
});
function renderQuiz(data) {
    var container = document.getElementById('quiz');
    if (!isDiv(container)) {
        console.error('Quiz container not found');
        return;
    }
    container.innerHTML = ''; // clear in case of re-render
    data.forEach(function (q, index) {
        var questionDiv = document.createElement('div');
        questionDiv.classList.add('mb-4');
        var question = document.createElement('h5');
        question.textContent = "".concat(index + 1, ". ").concat(q.question);
        questionDiv.appendChild(question);
        q.choices.forEach(function (choice) {
            var wrapper = document.createElement('div');
            wrapper.classList.add('form-check');
            var input = document.createElement('input');
            input.type = 'radio';
            input.name = "question-".concat(index);
            input.value = choice;
            input.classList.add('form-check-input');
            input.id = "q".concat(index, "-").concat(choice);
            var label = document.createElement('label');
            label.classList.add('form-check-label');
            label.setAttribute('for', input.id);
            label.textContent = choice;
            wrapper.appendChild(input);
            wrapper.appendChild(label);
            questionDiv.appendChild(wrapper);
        });
        container.appendChild(questionDiv);
    });
    var submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.classList.add('btn', 'btn-success', 'mt-3');
    submitBtn.onclick = handleSubmit;
    container.appendChild(submitBtn);
}
function handleSubmit() {
    var correctCount = 0;
    quizData.forEach(function (q, index) {
        var _a;
        var selected = (_a = document.querySelector("input[name=\"question-".concat(index, "\"]:checked"))) === null || _a === void 0 ? void 0 : _a.value;
        if (selected === q.answer) {
            correctCount++;
        }
    });
    alert("You got ".concat(correctCount, " out of ").concat(quizData.length, " correct!"));
}
