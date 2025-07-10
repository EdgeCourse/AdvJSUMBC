// === WeakMap to store session metadata per form ===
const formMeta = new WeakMap();

// === Type Guards ===
function isForm(el) {
  return el instanceof HTMLFormElement;
}
function isInput(el) {
  return el instanceof HTMLInputElement;
}
function getInputValue(id) {
  const el = document.getElementById(id);
  if (!isInput(el)) throw new Error(`Invalid input: ${id}`);
  return el.value.trim();
}

// === Proxy Wrapper ===
function createFormProxy(obj) {
  return new Proxy(obj, {
    get(target, prop) {
      const value = Reflect.get(target, prop);
      console.log(`📥 Accessed ${String(prop)}:`, value);
      return value;
    },
    set(target, prop, value) {
      console.log(`✏️ Set ${String(prop)} = ${value}`);
      return Reflect.set(target, prop, value);
    }
  });
}

// === DOM Ready Logic ===
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('myForm');
  const responseDiv = document.getElementById('response');

  if (!isForm(form) || !responseDiv) {
    console.error('Missing form or response div');
    return;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    console.log('📝 Form submitted');

    formMeta.set(form, { validated: false });

    // Wrap data in a Proxy for logging
    const inputs = createFormProxy({
      phone: getInputValue('phone'),
      email: getInputValue('email'),
      zip: getInputValue('zip')
    });

    const errors = [];

    if (!/^\d{10}$/.test(inputs.phone)) errors.push('Phone must be 10 digits.');
    if (!/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/.test(inputs.email)) errors.push('Invalid email format.');
    if (!/^\d{5}$/.test(inputs.zip)) errors.push('Zip must be 5 digits.');

    // Save validation state
    formMeta.set(form, { validated: errors.length === 0 });

    if (errors.length > 0) {
      responseDiv.innerHTML = `<div class="alert alert-danger">${errors.join('<br>')}</div>`;
      return;
    }

    try {
      const res = await fetch('/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputs)
      });

      const result = await res.json();
      responseDiv.innerHTML = `<div class="alert alert-success">${result.message || 'Success!'}</div>`;
    } catch (err) {
      console.error(err);
      responseDiv.innerHTML = `<div class="alert alert-danger">Submission failed. Try again.</div>`;
    }
  });
});
