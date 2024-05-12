import { register } from "../api/auth/register.mjs";

/**
 * Event listener for the register form
 * Extract the form data and send a request to the API to register
 * @param {array} profile - The profile data to be registered
 */

export function registerFormListener() {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    //send it to the API
    register(profile);
  });
}
