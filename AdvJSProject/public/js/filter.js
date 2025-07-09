import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';
function isInput(el) {
    return el instanceof HTMLInputElement;
}
const input = document.getElementById('search');
const rows = document.querySelectorAll('#infoTable tbody tr');
if (isInput(input)) {
    fromEvent(input, 'input').pipe(map((e) => e.target.value.toLowerCase()), debounceTime(300), distinctUntilChanged()).subscribe((value) => {
        rows.forEach(row => {
            var _a;
            const text = ((_a = row.textContent) === null || _a === void 0 ? void 0 : _a.toLowerCase()) || '';
            row.style.display = text.includes(value) ? '' : 'none';
        });
    });
}
else {
    console.error('Search input not found or is not an input element.');
}
