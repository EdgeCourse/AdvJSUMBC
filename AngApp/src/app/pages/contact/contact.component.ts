import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactForm: FormGroup;
  responseMessage = '';

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      email: ['', [Validators.required, Validators.email]],
      zip: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    this.responseMessage = this.contactForm.valid
      ? 'Form submitted successfully!'
      : 'Please correct the errors.';
  }
}
