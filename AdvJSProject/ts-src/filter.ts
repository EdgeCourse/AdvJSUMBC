import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged } from 'rxjs/operators';

function isInput(el: Element | null): el is HTMLInputElement {
  return el instanceof HTMLInputElement;
}

const input = document.getElementById('search');
const rows: NodeListOf<HTMLTableRowElement> = document.querySelectorAll('#infoTable tbody tr');

if (isInput(input)) {
  fromEvent(input, 'input').pipe(
    map((e: Event) => (e.target as HTMLInputElement).value.toLowerCase()),
    debounceTime(300),
    distinctUntilChanged()
  ).subscribe((value: string) => {
    rows.forEach(row => {
      const text = row.textContent?.toLowerCase() || '';
      row.style.display = text.includes(value) ? '' : 'none';
    });
  });
} else {
  console.error('Search input not found or is not an input element.');
}
