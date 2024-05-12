import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const method = "post";

/**
 * Add a comment to a post
 *
 * @param {object} postData - The comment data to be added to the post
 * @param {string} postId - The id of the post
 * @throws {Error} If the comment fails or an error occurs during the process.
 * @returns {promise} The result of the comment if it's successful
 */

export async function commentToPost(postData, postId) {
  const createCommentURL = `${API_SOCIAL}/posts/${postId}/comment`;
  try {
    const response = await authFetch(createCommentURL, {
      method,
      body: JSON.stringify(postData),
    });

    if (response.ok) {
      return await response.json();
    }

    if (!response.ok) {
      throw new Error("Error creating comment");
    }
  } catch (error) {
    console.log(error);
  }
}
