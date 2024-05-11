import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

export async function followUser(profileData) {
  try {
    if (!profileData) {
      throw new Error("Follow requires a name");
    }
    const followProfileURL = `${API_SOCIAL}${action}/${profileData}/follow`;

    const response = await authFetch(followProfileURL, {
      method,
    });
    console.log(response);
    console.log(profileData);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
