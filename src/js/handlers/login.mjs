import { login } from "../api/auth/login.mjs";

/**
 * Event listener for the login form
 * Extract the form data and send a request to the API to login
 */

export function loginFormListener() {
  const form = document.querySelector("#loginForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    login(profile);
  });
}
