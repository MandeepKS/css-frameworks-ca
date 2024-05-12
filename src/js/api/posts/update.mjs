import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "put";

/**
 * Updates a post in the API
 * @param {object} postData - The post data to be updated
 * @param {string} postData.id - The id of the post
 * @throws {Error} If the put fails or an error occurs during the process.
 * @returns {Promise<object>} The updated post data
 */

export async function updatePost(postData) {
  try {
    if (!postData.id) {
      throw new Error("Post ID is required");
    }
    const updatePostURL = `${API_SOCIAL}${action}/${postData.id}`;

    const response = await authFetch(updatePostURL, {
      method,
      body: JSON.stringify(postData),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
