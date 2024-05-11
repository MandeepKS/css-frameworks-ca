//This code sends the register form data to the api
import { API_SOCIAL } from "../constants.mjs";

const action = "/auth/register";
const method = "post";
const registerURL = API_SOCIAL + action;

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
