import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/profiles";
const method = "put";

export async function unfollowUser(profileData) {
  try {
    if (!profileData) {
      throw new Error("unfollow requires a name");
    }
    const unfollowProfileURL = `${API_SOCIAL}${action}/${profileData}/unfollow`;

    const response = await authFetch(unfollowProfileURL, {
      method,
    });
    console.log(response);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
