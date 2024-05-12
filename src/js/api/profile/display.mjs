import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";
import { profileInfo } from "../authFetch.mjs";

const action = "/profiles";
const posts = "_posts=true";
const followers = "_followers=true";
const following = "_following=true";

/**
 * Fetches profiles from the API
 * @param {number} limit of profiles to fetch in one go
 * @param {number} offset where to start fetching profiles
 * @returns {promise} result of the get
 */

export async function displayProfiles(limit = 100, offset = 0) {
  try {
    const displayProfilesURL = `${API_SOCIAL}${action}`;

    const response = await authFetch(displayProfilesURL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches a single profile from the API
 * @param {string} name username of the profile to fetch
 * @returns {promise} result of the get
 * @throws {Error} If the name parameter is empty or an error occurs during the process.
 */

export async function displayProfile(name) {
  try {
    if (!name) {
      throw new Error("Get requires a profile name");
    }

    const displayProfileURL = `${API_SOCIAL}${action}/${name}?${posts}&${followers}&${following}`;

    const response = await authFetch(displayProfileURL);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
