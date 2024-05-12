//This code sends the register form data to the api
import { API_SOCIAL } from "../constants.mjs";

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
      console.log(result.errors[0].message);
      alert(result.errors[0].message);
      throw new Error("Register failed");
    } else {
      alert("You have successfully registered! Please login to continue.");
      window.location.href = "/profile/login/";
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}
