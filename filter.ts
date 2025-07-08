import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

// Get input and rows with type safety
const input = document.getElementById('search') as HTMLInputElement | null;
const rows = document.querySelectorAll<HTMLTableRowElement>('#infoTable tbody tr');

function filterRows(value: string): void {
  rows.forEach(row => {
    const text = row.textContent?.toLowerCase() || '';
    row.style.display = text.includes(value) ? '' : 'none';
  });
}

if (input) {
  fromEvent<InputEvent>(input, 'input').pipe(
    map(e => (e.target as HTMLInputElement).value.toLowerCase()),
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe(filterRows);
} else {
  console.error('Search input not found.');
}
