import { API_SOCIAL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";
const errorMsg = document.querySelector(".error-message");

const action = "/auth/login";
const method = "post";

/**
 * Logs in the user by checking the profile data up against the API
 * Saves the token and profile in local storage on successful login in
 * displays an error message on failed login
 * redirects to the profile page on successful login
 *
 * @param {object} profile
 * @throws {Error} If the login fails or an error occurs during the process.
 *
 */

export async function login(profile) {
  try {
    const loginURL = API_SOCIAL + action;
    const body = JSON.stringify(profile);
    const response = await fetch(loginURL, {
      headers: {
        "Content-Type": "application/json",
      },
      method,
      body,
    });

    const { accessToken, ...user } = await response.json();

    if (!response.ok) {
      errorMsg.removeAttribute("hidden");
      errorMsg.classList.add("bg-danger");
      errorMsg.textContent = `Login failed: ${user.errors[0].message}`;
      throw new Error("Login failed");
    } else {
      storage.save("token", accessToken);
      storage.save("profile", user);
      errorMsg.removeAttribute("hidden");
      if (errorMsg.classList.contains("bg-danger")) {
        errorMsg.classList.remove("bg-danger");
      }
      errorMsg.classList.add("bg-success");
      errorMsg.textContent = `Login successful`;
      window.location.href = "/profile/";
    }
  } catch (error) {
    console.log(error);
  }
}
