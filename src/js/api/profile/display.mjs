import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { profileInfo } from "../authFetch.mjs";

const action = "/profiles";

export async function displayProfiles() {
  try {
    const displayProfilesURL = `${API_SOCIAL}${action}`;

    const response = await authFetch(displayProfilesURL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

export async function displayProfile(name) {
  try {
    if (!name) {
      throw new Error("Get requires a profile name");
    }
    const displayProfileURL = `${API_SOCIAL}${action}/${name}`;

    const response = await authFetch(displayProfileURL);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

// console.log(await displayProfile("fridafever"));
// const profile = profileInfo();
// console.log(profile.name);
