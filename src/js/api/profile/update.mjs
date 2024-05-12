import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

/**
 * Updates a profile in the API, avatar and/or banner
 * @param {object} profileData - The profile data to be updated
 * @param {string} profileData.name - The name of the profile
 * @throws {Error} If the put fails or an error occurs during the process.
 * @returns {Promise<object>} The updated profile data
 */

export async function updateProfile(profileData) {
  try {
    if (!profileData.name) {
      throw new Error("Update requires a name");
    }
    const updateProfileURL = `${API_SOCIAL}${action}/${profileData.name}/media`;

    const response = await authFetch(updateProfileURL, {
      method,
      body: JSON.stringify(profileData),
    });
    console.log(response);
    console.log(profileData.name);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
