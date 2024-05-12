import { authFetch } from "../authFetch.mjs";
import { API_SOCIAL } from "../constants.mjs";

const action = "?_author=true&_reactions=true&_comments=true";

/**
 * Fetches all posts from the API for a specific profile/username
 * @throws {Error} If the get fails or an error occurs during the process.
 * @returns {promise} The result of the get
 */

export async function displayProfilePosts(username) {
  try {
    if (!username) {
      throw new Error("Displaying the posts requires a name");
    }
    const displayProfilePostsURL = `${API_SOCIAL}/profiles/${username}/posts${action}`;

    const response = await authFetch(displayProfilePostsURL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
