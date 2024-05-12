import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "post";

/**
 * Creates a post
 *
 * @param {object} postData - The post data to be added to the post
 * @throws {Error} If the post fails or an error occurs during the process.
 * @returns {promise} The result of the post
 */

export async function createPost(postData) {
  try {
    const createPostURL = API_SOCIAL + action;

    const response = await authFetch(createPostURL, {
      method,
      body: JSON.stringify(postData),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
