import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

// Type guard helpers
function isForm(el: Element | null): el is HTMLFormElement {
  return el instanceof HTMLFormElement;
}
function isInput(el: Element | null): el is HTMLInputElement {
  return el instanceof HTMLInputElement;
}
function getInputValue(id: string): string {
  const el = document.getElementById(id);
  if (!isInput(el)) throw new Error(`Missing or invalid input element: ${id}`);
  return el.value.trim();
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const responseDiv = document.getElementById('response');

  if (!isForm(form) || !responseDiv) {
    console.error('Form or response div not found!');
    return;
  }

  fromEvent(form, 'submit').pipe(
    tap((e: Event) => {
      e.preventDefault();
      console.log('Form submitted via RxJS');
    }),
    debounceTime(300),
    map(() => {
      const phone = getInputValue('phone');
      const email = getInputValue('email');
      const zip = getInputValue('zip');

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
        body: JSON.stringify({ phone, email, zip }),
      });

      const result = await res.json();
      responseDiv.innerHTML = `<div class="alert alert-success">${result.message || 'Success!'}</div>`;
    } catch (err) {
      console.error(err);
      responseDiv.innerHTML = `<div class="alert alert-danger">Submission failed. Try again.</div>`;
    }
  });
});
