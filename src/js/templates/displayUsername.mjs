import { load } from "../storage/index.mjs";

/**
 * a function that displays the username of the logged in user in the menu
 */

export function displayUsername() {
  const visitProfile = document.querySelector(".visit-profile");
  if (!visitProfile) {
    return;
  } else {
    const profile = load("profile");
    if (profile.statusCode === 401) {
      window.location.href = "/";
    } else {
      visitProfile.innerHTML += profile.name.toUpperCase();
    }
  }
}
