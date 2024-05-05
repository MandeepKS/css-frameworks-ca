import { API_SOCIAL } from "../constants.mjs";
import * as storage from "../../storage/index.mjs";

const action = "/auth/login";
const method = "post";

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

    // const result = await response.json();
    const { accessToken, ...user } = await response.json();
    storage.save("token", accessToken);
    storage.save("profile", user);
    alert("Login successful");
    window.location.href = "/profile/";
  } catch (error) {
    console.log(error);
  }
}
