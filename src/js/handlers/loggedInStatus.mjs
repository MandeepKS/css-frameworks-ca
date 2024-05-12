import { load } from "../storage/index.mjs";
const loggedIn = load("profile");

/**
 * Redirects to the login page if the user is not logged in.
 */

export function loggedInStatus() {
  if (!loggedIn) {
    location.href = "/profile/login/";
  }
}
