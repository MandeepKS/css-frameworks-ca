import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

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
