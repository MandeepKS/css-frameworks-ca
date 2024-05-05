import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const action = "/posts";
const method = "delete";

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
