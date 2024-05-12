import { createPost } from "../api/posts/create.mjs";
import { postTemplate } from "../handlers/postTemplate.mjs";

/**
 * Set event listener for create post form
 * Split tags by comma and trim whitespace
 * extract form data and sends a request to the API to create a new post
 * renders the new post to the feed
 * resets the form
 * if an error occurs, logs the error to the console
 */

export function setCreatePostFormListener() {
  const form = document.querySelector("#create-post");

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

    try {
      await createPost(postData);
      await postTemplate();
      form.reset();
    } catch (error) {
      console.error("Error creating post:", error);
    }
  });
}
