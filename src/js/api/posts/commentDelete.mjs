import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

/**
 * Removes a comment from a post
 *
 * @param {string} id - The id of the post
 * @param {string} commentId - The id of the comment
 * @throws {Error} If the delete fails or an error occurs during the process.
 * @returns {promise} The result of the delete
 */

export async function removeComment(id, commentId) {
  try {
    if (!id) {
      throw new Error("Delete requires a post ID");
    }
    const removeCommentURL = `${API_SOCIAL}${action}/${id}/comment/${commentId}`;

    const response = await authFetch(removeCommentURL, {
      method,
    });

    return await response;
    //removed .json() from the above return statement as it fired an error
  } catch (error) {
    console.log(error);
  }
}
