document.getElementById('login-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value.trim();

  if (username === 'admin' && password === '123456') {
    // Simulate redirect OR show success
    // Option A: Redirect
    // window.location.href = '/dashboard.html';

    // Option B: Show message (easier to test)
    document.getElementById('success').style.display = 'block';
  } else {
    alert('Invalid credentials');
  }
});
