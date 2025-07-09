import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  standalone: true,
  imports: [CommonModule], // <-- Required for *ngFor, *ngIf
})
export class QuizComponent {
  quizData = [
    { question: 'What is Angular?', choices: ['Library', 'Framework'], answer: 'Framework' }
  ];
  userAnswers: string[] = [];
  resultMessage = '';

  selectAnswer(index: number, choice: string) {
    this.userAnswers[index] = choice;
  }

  submitQuiz() {
    let score = 0;
    this.quizData.forEach((q, i) => {
      if (this.userAnswers[i] === q.answer) score++;
    });
    this.resultMessage = `You got ${score} out of ${this.quizData.length}`;
  }
}
