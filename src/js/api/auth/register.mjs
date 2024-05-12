//This code sends the register form data to the api
import { API_SOCIAL } from "../constants.mjs";
const errorMsg = document.querySelector(".error-message");

const action = "/auth/register";
const method = "post";
const registerURL = API_SOCIAL + action;

/**
 * Register a new user by sending the profile data to the API
 *
 * @param {object} profile -The user profile to be registered
 * @throws {Error} If the registration fails or an error occurs during the process.
 * @returns {promise} The result of the registration
 */

export async function register(profile) {
  try {
    const body = JSON.stringify(profile);
    const response = await fetch(registerURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    const result = await response.json();
    console.log(result);
    if (!response.ok) {
      errorMsg.removeAttribute("hidden");
      errorMsg.classList.add("bg-danger");
      errorMsg.textContent = `Register failed: ${result.errors[0].message}`;
      throw new Error("Register failed: " + result.errors[0].message);
    } else {
      errorMsg.removeAttribute("hidden");
      if (errorMsg.classList.contains("bg-danger")) {
        errorMsg.classList.remove("bg-danger");
      }
      errorMsg.classList.add("bg-success");
      errorMsg.textContent = `Register successful, redirecting to login page`;
      //redirect to login page after 4 seconds
      setTimeout(() => {
        window.location.href = "/profile/login/";
      }, 4000);
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
