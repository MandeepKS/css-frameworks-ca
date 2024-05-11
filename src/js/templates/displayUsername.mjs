import { load } from "../storage/index.mjs";
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
