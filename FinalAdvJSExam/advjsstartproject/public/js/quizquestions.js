
"use strict";

let quizData = [];
let currentQuestionIndex = 0;
let correctCount = 0;

function isDiv(el) {
    return el instanceof HTMLDivElement;
}

fetch('/api/quiz')
    .then(res => res.json())
    .then(data => {
        quizData = data;
        showQuestion(currentQuestionIndex);
    })
    .catch(err => {
        console.error('Error loading quiz:', err);
    });

function showQuestion(index) {
    const container = document.getElementById('quiz');
    if (!isDiv(container)) {
        console.error('Quiz container not found');
        return;
    }

    const q = quizData[index];
    container.innerHTML = '';

    const questionDiv = document.createElement('div');
    questionDiv.classList.add('mb-4');

    const question = document.createElement('h5');
    question.textContent = `${index + 1}. ${q.question}`;
    questionDiv.appendChild(question);

    q.choices.forEach(choice => {
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

    const explanation = document.createElement('p');
    explanation.id = `explanation-${index}`;
    explanation.classList.add('text-info');
    explanation.style.display = 'none';
    questionDiv.appendChild(explanation);

    const nextBtn = document.createElement('button');
    nextBtn.textContent = index === quizData.length - 1 ? 'Finish Quiz' : 'Next';
    nextBtn.classList.add('btn', 'btn-primary', 'mt-3');
    nextBtn.disabled = true;

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit Answer';
    submitBtn.classList.add('btn', 'btn-success', 'mt-3', 'me-2');
    submitBtn.onclick = () => {
        const selected = document.querySelector(`input[name="question-${index}"]:checked`);
        if (!selected) return;

        const userAnswer = selected.value;
        const isCorrect = userAnswer === q.answer;

        if (isCorrect) {
            correctCount++;
            selected.parentElement.style.backgroundColor = "#d4edda";
        } else {
            selected.parentElement.style.backgroundColor = "#f8d7da";
        }

        const explanationEl = document.getElementById(`explanation-${index}`);
        explanationEl.innerHTML = `
            <strong>Correct Answer:</strong> ${q.answer}<br>
            <strong>Explanation:</strong> ${q.explanation}<br>
            <a href="${q.reference}" target="_blank">Learn more</a>
        `;
        explanationEl.style.display = 'block';
        submitBtn.disabled = true;
        nextBtn.disabled = false;
    };

    nextBtn.onclick = () => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizData.length) {
            showQuestion(currentQuestionIndex);
        } else {
            showResults();
        }
    };

    container.appendChild(questionDiv);
    container.appendChild(submitBtn);
    container.appendChild(nextBtn);
}

function showResults() {
    const container = document.getElementById('quiz');
    container.innerHTML = `
        <h4>You scored ${correctCount} out of ${quizData.length}!</h4>
        <button onclick="location.reload()" class="btn btn-secondary mt-3">Restart Quiz</button>
    `;
}

/*
"use strict";

let quizData = [];

function isDiv(el) {
    return el instanceof HTMLDivElement;
}

fetch('/api/quiz')
    .then((res) => res.json())
    .then((data) => {
        quizData = data;
        renderQuiz(data);
    })
    .catch((err) => {
        console.error('Error loading quiz:', err);
    });

function renderQuiz(data) {
    const container = document.getElementById('quiz');
    if (!isDiv(container)) {
        console.error('Quiz container not found');
        return;
    }
    container.innerHTML = ''; // clear

    data.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('mb-4', 'question-block');
        questionDiv.dataset.index = index;

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

        // Placeholder for feedback (explanation, correct answer)
        const feedback = document.createElement('div');
        feedback.classList.add('feedback', 'mt-2');
        questionDiv.appendChild(feedback);

        container.appendChild(questionDiv);
    });

    const submitBtn = document.createElement('button');
    submitBtn.textContent = 'Submit';
    submitBtn.classList.add('btn', 'btn-success', 'mt-3');
    submitBtn.onclick = handleSubmit;
    container.appendChild(submitBtn);
}

function handleSubmit() {
    let correctCount = 0;

    quizData.forEach((q, index) => {
        const selected = document.querySelector(`input[name="question-${index}"]:checked`);
        const questionDiv = document.querySelector(`.question-block[data-index="${index}"]`);
        const feedback = questionDiv.querySelector('.feedback');
        feedback.innerHTML = '';

        if (!selected) {
            feedback.innerHTML = `<p class="text-warning">No answer selected.</p>`;
            return;
        }

        const userAnswer = selected.value;

        if (userAnswer === q.answer) {
            correctCount++;
            selected.parentElement.classList.add('text-success');
            feedback.innerHTML = `
                <p class="text-success">✅ Correct!</p>
                <p><strong>Explanation:</strong> ${q.explanation}</p>
                <p><a href="${q.reference}" target="_blank">Learn more</a></p>
            `;
        } else {
            selected.parentElement.classList.add('text-danger');
            const correctOption = questionDiv.querySelector(`input[value="${q.answer}"]`);
            if (correctOption) {
                correctOption.parentElement.classList.add('text-success');
            }

            feedback.innerHTML = `
                <p class="text-danger">❌ Incorrect. Correct answer: <strong>${q.answer}</strong></p>
                <p><strong>Explanation:</strong> ${q.explanation}</p>
                <p><a href="${q.reference}" target="_blank">Learn more</a></p>
            `;
        }
    });

    alert(`You got ${correctCount} out of ${quizData.length} correct!`);
}
*/