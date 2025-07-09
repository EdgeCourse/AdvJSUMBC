interface QuizQuestion {
    question: string;
    choices: string[];
    answer: string;
  }
  
  let quizData: QuizQuestion[] = [];
  
  function isDiv(el: Element | null): el is HTMLDivElement {
    return el instanceof HTMLDivElement;
  }
  
  fetch('/api/quiz')
    .then((res) => res.json())
    .then((data: QuizQuestion[]) => {
      quizData = data;
      renderQuiz(data);
    })
    .catch((err) => {
      console.error('Error loading quiz:', err);
    });
  
  function renderQuiz(data: QuizQuestion[]): void {
    const container = document.getElementById('quiz');
    if (!isDiv(container)) {
      console.error('Quiz container not found');
      return;
    }
    container.innerHTML = ''; // clear in case of re-render
  
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
  
  function handleSubmit(): void {
    let correctCount = 0;
  
    quizData.forEach((q, index) => {
      const selected = (document.querySelector(`input[name="question-${index}"]:checked`) as HTMLInputElement | null)?.value;
      if (selected === q.answer) {
        correctCount++;
      }
    });
  
    alert(`You got ${correctCount} out of ${quizData.length} correct!`);
  }
  