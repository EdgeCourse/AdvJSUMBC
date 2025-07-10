// === DOM References ===
const input = document.getElementById('search');
const rows = document.querySelectorAll('#infoTable tbody tr');

// === Advanced JS Features ===
const VISIBLE = Symbol('visible');        // Invisible tag to mark rows
const matchedSet = new Set();             // Tracks matched rows

// Custom Iterator over table rows
function* rowIterator() {
  for (const row of rows) yield row;
}

// === Type Guard ===
function isInput(el) {
  return el instanceof HTMLInputElement;
}

// === Main Filtering Logic ===
if (isInput(input)) {
  input.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();
    matchedSet.clear(); // reset visible tracker

    for (const row of rowIterator()) {
      const text = row.textContent?.toLowerCase() || '';
      const match = text.includes(value);
      row.style.display = match ? '' : 'none';

      if (match) {
        matchedSet.add(row);
        row[VISIBLE] = true; // tag as visible
      } else {
        delete row[VISIBLE]; // remove tag
      }
    }

    console.log(`Filter matched ${matchedSet.size} row(s).`);
  });
} else {
  console.error('Search input not found or not an input element.');
}
