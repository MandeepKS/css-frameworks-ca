import { load } from "../storage/index.mjs";
const loggedIn = load("profile");

/**
 * Redirects to the login page if the user is not logged in.
 * Redirects to the feed page if the user is logged in and enters the login or register page.
 */

export function loggedOutStatus() {
  if (!loggedIn) {
    location.href = "/profile/login/";
  }
}

export function loggedInStatus() {
  if (loggedIn) {
    location.href = "/feed/";
  }
}
