import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

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
