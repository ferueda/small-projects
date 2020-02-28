<<<<<<< HEAD
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}

// Show input success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArray) {
  inputArray.forEach(input =>
    input.value === '' ? showError(input, `${getLabel(input)} is required`) : showSuccess(input)
  );
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getLabel(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getLabel(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function arePasswordEqual(pas1, pas2) {
  if (pas1 !== pas2) {
    showError(password2, 'Password do not match');
  }
}

function getLabel(input) {
  const formControl = input.parentElement;
  return formControl.querySelector('label').textContent;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  arePasswordEqual(password.value, password2.value);
});
=======
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// Show input error message
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.textContent = message;
}

// Show input success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}

// Check email is valid
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(input.value)) {
    showSuccess(input);
  } else {
    showError(input, 'Email is not valid');
  }
}

function checkRequired(inputArray) {
  inputArray.forEach(input =>
    input.value === '' ? showError(input, `${getLabel(input)} is required`) : showSuccess(input)
  );
}

function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${getLabel(input)} must be at least ${min} characters`);
  } else if (input.value.length > max) {
    showError(input, `${getLabel(input)} must be less than ${max} characters`);
  } else {
    showSuccess(input);
  }
}

function arePasswordEqual(pas1, pas2) {
  if (pas1 !== pas2) {
    showError(password2, 'Password do not match');
  }
}

function getLabel(input) {
  const formControl = input.parentElement;
  return formControl.querySelector('label').textContent;
}

form.addEventListener('submit', function(e) {
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkEmail(email);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  arePasswordEqual(password.value, password2.value);
});
>>>>>>> 27ba24ca6a1df9ca1b647ca77e005b4223f352b9
