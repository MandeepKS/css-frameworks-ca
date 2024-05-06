import { load } from "../storage/index.mjs";
export function displayUsername() {
  const visitProfile = document.querySelector(".visit-profile");
  if (!visitProfile) {
    return;
  } else {
    const profile = load("profile");
    visitProfile.innerHTML += profile.name.toUpperCase();
    if (profile.name === "undefined") {
      visitProfile.innerHTML += "Profile";
    }
  }
}
