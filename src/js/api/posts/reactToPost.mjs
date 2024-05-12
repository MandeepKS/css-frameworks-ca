import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

/**
 * Saves a reaction to a post
 *
 * @param {string} reaction - The reaction to be added to the post, in this case a heart
 * @param {string} postId - The id of the post to which the reaction is being added
 * @throws {Error} If the put fails or an error occurs during the process.
 * @returns {promise} The result of the put
 */

export async function saveReactionToPost(reaction, postId) {
  const action = "posts";
  const method = "put";
  try {
    const reactionURL = `${API_SOCIAL}/${action}/${postId}/react/${reaction}`;
    const response = await authFetch(reactionURL, {
      method,
      body: JSON.stringify(reaction),
    });

    return await response.json();
  } catch (error) {
    console.log(error);
  }
}
