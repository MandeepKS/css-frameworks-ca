import { register } from "../api/auth/register.mjs";

export function registerFormListener() {
  const form = document.querySelector("#registerForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const profile = Object.fromEntries(formData.entries());

    //send it to the API
    register(profile);
    alert("You have successfully registered! Please login to continue.");
    window.location.href = "/profile/login/";
  });
}
