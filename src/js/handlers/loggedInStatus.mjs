import { load } from "../storage/index.mjs";
const loggedIn = load("profile");

export function loggedInStatus() {
  if (!loggedIn) {
    location.href = "/profile/login/";
  }
}
