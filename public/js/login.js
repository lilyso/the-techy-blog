const incorrect = document.querySelector(".incorrect");
const invalid = document.querySelector(".invalid");

// Returning user login request
const loginFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const email = document.querySelector("#email-login").value.trim();
  const password = document.querySelector("#password-login").value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.replace("/dashboard");
    } else {
      // Display error message if user input is incorrect
      incorrect.classList.toggle("incorrect");
    }
  }
};

// New user POST request
const signupFormHandler = async (event) => {
  event.preventDefault();
  // Collect values from the login form
  const user_name = document.querySelector("#name-signup").value.trim();
  const email = document.querySelector("#email-signup").value.trim();
  const password = document.querySelector("#password-signup").value.trim();

  if (user_name && email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ user_name, email, password }),
      headers: { "Content-Type": "application/json" },
    });
    // If successful, redirect the browser to the dashboard
    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      // Display error message if values do not meet requirements
      invalid.classList.toggle("invalid");
    }
  }
};

// Event listeners
document
  .querySelector(".login-form")
  .addEventListener("submit", loginFormHandler);

document
  .querySelector(".signup-form")
  .addEventListener("submit", signupFormHandler);
