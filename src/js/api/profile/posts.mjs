import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL } from "../constants.mjs";

const action = "?_author=true&_reactions=true&_comments=true";

export async function displayProfilePosts(username) {
  try {
    const displayProfilePostsURL = `${API_SOCIAL}/profiles/${username}/posts${action}`;

    const response = await authFetch(displayProfilePostsURL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
