import { API_SOCIAL } from "../constants.mjs";
import { authFetch } from "../authFetch.mjs";

const method = "post";

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
