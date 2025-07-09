var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { fromEvent } from 'rxjs';
import { debounceTime, map, tap } from 'rxjs/operators';
// Type guard helpers
function isForm(el) {
    return el instanceof HTMLFormElement;
}
function isInput(el) {
    return el instanceof HTMLInputElement;
}
function getInputValue(id) {
    const el = document.getElementById(id);
    if (!isInput(el))
        throw new Error(`Missing or invalid input element: ${id}`);
    return el.value.trim();
}
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('myForm');
    const responseDiv = document.getElementById('response');
    if (!isForm(form) || !responseDiv) {
        console.error('Form or response div not found!');
        return;
    }
    fromEvent(form, 'submit').pipe(tap((e) => {
        e.preventDefault();
        console.log('Form submitted via RxJS');
    }), debounceTime(300), map(() => {
        const phone = getInputValue('phone');
        const email = getInputValue('email');
        const zip = getInputValue('zip');
        const errors = [];
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
    })).subscribe((_a) => __awaiter(void 0, [_a], void 0, function* ({ phone, email, zip, errors }) {
        if (errors.length > 0) {
            responseDiv.innerHTML = `<div class="alert alert-danger">${errors.join('<br>')}</div>`;
            return;
        }
        try {
            const res = yield fetch('/submit-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phone, email, zip }),
            });
            const result = yield res.json();
            responseDiv.innerHTML = `<div class="alert alert-success">${result.message || 'Success!'}</div>`;
        }
        catch (err) {
            console.error(err);
            responseDiv.innerHTML = `<div class="alert alert-danger">Submission failed. Try again.</div>`;
        }
    }));
});
