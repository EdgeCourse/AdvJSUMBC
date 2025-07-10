import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';

/**
 * Type guard to check if an element is an HTMLFormElement.
 * @param {Element | null} el - The DOM element to check
 * @returns {el is HTMLFormElement} True if it's a form
 */
function isForm(el: Element | null): el is HTMLFormElement {
  return el instanceof HTMLFormElement;
}

/**
 * Type guard to check if an element is an HTMLInputElement.
 * @param {Element | null} el - The DOM element to check
 * @returns {el is HTMLInputElement} True if it's an input
 */
function isInput(el: Element | null): el is HTMLInputElement {
  return el instanceof HTMLInputElement;
}

/**
 * Retrieves and validates the value of an input element by ID.
 * @param {string} id - The ID of the input element
 * @returns {string} The trimmed input value
 * @throws Will throw an error if the element is not a valid input
 */
function getInputValue(id: string): string {
  const el = document.getElementById(id);
  if (!isInput(el)) throw new Error(`Missing or invalid input element: ${id}`);
  return el.value.trim();
}

// DOM ready event
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const responseDiv = document.getElementById('response');

  if (!isForm(form) || !responseDiv) {
    console.error('Form or response div not found!');
    return;
  }

  /**
   * Handles form submission using RxJS.
   * Validates phone, email, and zip fields with live feedback.
   */
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

      /** @type {string[]} */
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
    if (errors.length) {
      responseDiv.textContent = errors.join(' ');
      responseDiv.className = 'alert alert-danger';
      return;
    }

    // Simulate sending data
    const payload = { phone, email, zip };
    console.log('Sending:', payload);

    responseDiv.textContent = 'Submitted successfully!';
    responseDiv.className = 'alert alert-success';
  });
});
