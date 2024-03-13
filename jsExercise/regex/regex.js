const regexEmail = /^(?!.*[\-\_\.]{2})(?!.*[\-\_\.]@)[a-z0-9-_][a-z0-9\-\_\.]+@.*\.[a-z0-9-]{2,}$/;
const regexPassword = /^(?=.{8,})(?=.*[!@#$%^&*()\[\]{};'":<>,.\/?|~`].*)(?=.*[A-Z].*)(?=.*[0-9].*)/;
function checkEmail(e) {
  e.stopPropagation();
  const result = regexEmail.test(e.target.value) ? "valid" : "invalid";
  document.getElementById("emailRegexResult").innerHTML = result;
}
function checkPassword(e) {
  e.stopPropagation();
  const result = regexPassword.test(e.target.value) ? "valid" : "invalid";
  document.getElementById("passwordRegexResult").innerHTML = result;
}