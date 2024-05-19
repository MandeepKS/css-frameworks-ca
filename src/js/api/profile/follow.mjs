import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

/**
 * Follows a user
 * @param {string} profileData username of the profile to follow
 * @returns {promise} result of the get
 * @throws {Error} If the name parameter is empty or an error occurs during the process
 */

export async function followUser(profileData) {
  try {
    if (!profileData) {
      throw new Error("Follow requires a name");
    }
    const followProfileURL = `${API_SOCIAL}${action}/${profileData}/follow`;

    const response = await authFetch(followProfileURL, {
      method,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
