import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm') as HTMLFormElement | null;
  const responseDiv = document.getElementById('response') as HTMLDivElement | null;
  const phoneInput = document.getElementById('phone') as HTMLInputElement | null;
  const emailInput = document.getElementById('email') as HTMLInputElement | null;
  const zipInput = document.getElementById('zip') as HTMLInputElement | null;

  if (!form || !phoneInput || !emailInput || !zipInput || !responseDiv) {
    console.error('Required form elements not found!');
    return;
  }

  fromEvent<SubmitEvent>(form, 'submit').pipe(
    tap(e => {
      e.preventDefault();
      console.log('Form submitted via RxJS');
    }),
    debounceTime(300),
    map(() => {
      const phone = phoneInput.value.trim();
      const email = emailInput.value.trim();
      const zip = zipInput.value.trim();

      const errors: string[] = [];

      if (!/^\d{10}$/.test(phone)) {
        errors.push('Phone must be 10 digits.');
      }

      if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(email)) {
        errors.push('Email is invalid.');
      }

      if (!/^\d{5}$/.test(zip)) {
        errors.push('Zip must be 5 digits.');
      }

      return { phone, email, zip, errors };
    })
  ).subscribe(async ({ phone, email, zip, errors }) => {
    if (errors.length > 0) {
      responseDiv.innerHTML = `<div class="alert alert-danger">${errors.join('<br>')}</div>`;
      return;
    }

    try {
      const res = await fetch('/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, email, zip })
      });

      const msg = await res.text();
      responseDiv.innerHTML = `<div class="alert alert-success">${msg}</div>`;
      form.reset();
    } catch (error) {
      responseDiv.innerHTML = `<div class="alert alert-danger">Submission failed.</div>`;
      console.error('Submission error:', error);
    }
  });
});
