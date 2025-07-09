import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule], // <- Needed for ngModel, ngForm
})
export class AdminComponent {
  quizData: { question: string; choicesString: string; answer: string }[] = [];

  addQuestion(form: any): void {
    const newQuestion = form.value.newQuestion;
    const newChoices = form.value.newChoices;
    const newAnswer = form.value.newAnswer;
    this.quizData.push({
      question: newQuestion,
      choicesString: newChoices,
      answer: newAnswer
    });
    form.resetForm();
  }
}
