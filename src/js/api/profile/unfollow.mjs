import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

/**
 * Unfollows a user
 * @param {string} profileData username of the profile to unfollow
 * @returns {promise} result of the get
 * @throws {Error} If the name parameter is empty or an error occurs during the process
 */

export async function unfollowUser(profileData) {
  try {
    if (!profileData) {
      throw new Error("unfollow requires a name");
    }
    const unfollowProfileURL = `${API_SOCIAL}${action}/${profileData}/unfollow`;

    const response = await authFetch(unfollowProfileURL, {
      method,
    });
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
