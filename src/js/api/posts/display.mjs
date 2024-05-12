import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const author = "_author=true";
const comments = "&_comments=true";
const reactions = "&_reactions=true";

/**
 * Fetches all posts from the API
 *
 * @throws {Error} If the get fails or an error occurs during the process.
 * @returns {promise} The result of the get
 */

export async function displayPosts() {
  try {
    const displayPostsURL = `${API_SOCIAL}${action}?${author}${comments}${reactions}`;

    const response = await authFetch(displayPostsURL);
    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches a single post from the API
 *
 * @param {string} id - The id of the post
 * @throws {Error} If the get fails or an error occurs during the process.
 * @returns {promise} The result of the get
 */

export async function displayPost(id) {
  try {
    if (!id) {
      throw new Error("Get requires a post ID");
    }
    const displayPostURL = `${API_SOCIAL}${action}/${id}?${author}${comments}${reactions}`;

    const response = await authFetch(displayPostURL);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}

/**
 * Fetches all posts by a specific tag from the API
 *
 * @param {string} tag - The tag
 * @throws {Error} If the get fails or an error occurs during the process.
 * @returns {promise} The result of the get
 */

export async function displayPostsByTag(tag) {
  try {
    const displayPostByTagURL = `${API_SOCIAL}${action}?tags=${tag}&${author}${comments}${reactions}`;

    const response = await authFetch(displayPostByTagURL);

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
