const form = document.getElementById("contactUs");
const successMsg = document.getElementById("success");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const queryTypeInputs = document.querySelectorAll('input[name="queryType"]');
const messageInput = document.getElementById("message");
const consentInput = document.getElementById("consent");
const submitBtn = document.getElementById("submit");

const firstNameError = document.getElementById("firstNameError");
const lastNameError = document.getElementById("lastNameError");
const emailError = document.getElementById("emailError");
const queryInputError = document.getElementById("queryInputError");
const messageError = document.getElementById("messageError");
const consentError = document.getElementById("consentError");

function validateField(input, errorElement) {
  if (input.value.trim() === "") {
    errorElement.style.display = "block";
    return false;
  } else {
    errorElement.style.display = "none";
    return true;
  }
}

successMsg.style.display = "none";

firstNameInput.addEventListener("input", () => {
  validateField(firstNameInput, firstNameError);
  firstNameInput.classList.add("selected");
});

lastNameInput.addEventListener("input", () => {
  validateField(lastNameInput, lastNameError);
  lastNameInput.classList.add("selected");
});

emailInput.addEventListener("input", () => {
  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.style.display = "block";
    emailInput.classList.remove("valid");
  } else {
    emailError.style.display = "none";
    emailInput.classList.add("valid");
  }
  emailInput.classList.add("selected");
});

queryTypeInputs.forEach((input) => {
  input.addEventListener("change", () => {
    queryTypeInputs.forEach((input) => {
      input.closest(".queryInput").classList.remove("selected");
    });
    input.closest(".queryInput").classList.add("selected");
    queryInputError.style.display = "none";
  });
});

messageInput.addEventListener("input", () => {
  validateField(messageInput, messageError);
  messageInput.classList.add("selected");
});

consentInput.addEventListener("input", () => {
  if (consentInput.checked) {
    consentError.style.display = "none";
  } else {
    consentError.style.display = "block";
  }
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let isValid = true;

  isValid = validateField(firstNameInput, firstNameError) && isValid;
  isValid = validateField(lastNameInput, lastNameError) && isValid;

  const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  if (!emailPattern.test(emailInput.value)) {
    emailError.style.display = "block";
    isValid = false;
  } else {
    emailError.style.display = "none";
  }

  const queryChecked = Array.from(queryTypeInputs).some(
    (input) => input.checked
  );
  if (!queryChecked) {
    queryInputError.style.display = "block";
    isValid = false;
  } else {
    queryInputError.style.display = "none";
  }

  isValid = validateField(messageInput, messageError) && isValid;

  if (!consentInput.checked) {
    consentError.style.display = "block";
    isValid = false;
  } else {
    consentError.style.display = "none";
  }

  if (isValid) {
    successMsg.style.display = "flex";
    form.reset();
    queryTypeInputs.forEach((input) => (input.checked = false));
    queryTypeInputs.forEach((input) => {
      input.closest('.queryInput').classList.remove("selected");
    });
  } else {
    successMsg.style.display = "none";
  }
});
