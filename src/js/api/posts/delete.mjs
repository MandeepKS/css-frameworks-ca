import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

/**
 * Removes a post
 *
 * @param {string} id - The id of the post
 * @throws {Error} If the delete fails or an error occurs during the process.
 * @returns {promise} The result of the delete
 */

export async function removePost(id) {
  try {
    if (!id) {
      throw new Error("Delete requires a post ID");
    }
    const removePostURL = `${API_SOCIAL}${action}/${id}`;

    const response = await authFetch(removePostURL, {
      method,
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
