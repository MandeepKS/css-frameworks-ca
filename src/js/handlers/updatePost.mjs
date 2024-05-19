import { updatePost } from "../api/posts/index.mjs";
import { displayPost } from "../api/posts/display.mjs";

/**
 * Set listener for update post form
 * checks if the form exists
 * Extract the form data and send a request to the API to update the post
 * @param {object} post - The post data to be updated
 * @param {string} post.id - The id of the post
 * @param {string} post.title - The title of the post
 * @param {string} post.body - The body of the post
 * @param {string} post.media - The media of the post
 * @param {string} post.tags - The tags of the post
 * @param {Array} postData - The data that gets sent to the API
 * gives the postFormId a value of the postId
 * Redirects to the post page after updating the post
 *
 */

export async function setUpdatePostFormListener() {
  const form = document.querySelector("#update-post");
  if (form) {
    const url = new URL(location.href);
    const postId = url.searchParams.get("id");
    const post = await displayPost(postId);
    const title = form.querySelector(".title-input");
    title.value = post.title;
    const body = form.querySelector(".body-input");
    body.value = post.body;
    const media = form.querySelector(".media-input");
    media.value = post.media;
    const tags = form.querySelector(".tags-input");
    tags.value = post.tags;
    const postFormId = form.querySelector(".post-id");
    postFormId.value = postId;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const postData = {};

      for (const [key, value] of formData.entries()) {
        if (key === "tags") {
          // Split tags by comma and trim whitespace
          postData[key] = value.split(",").map((tag) => tag.trim());
        } else {
          postData[key] = value;
        }
      }

      post.id = postId;

      try {
        updatePost(postData);
        setTimeout(() => {
          window.location.href = `/feed/post/?id=${postId}`;
        }, 1500);
      } catch (error) {
        console.error("Error updating profile:", error); // Check if there are any errors during the update process
      }
    });
  }
}
