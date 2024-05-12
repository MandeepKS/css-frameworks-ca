import { commentToPost } from "../api/posts/commentToPost.mjs";

/**
 * Set the event listener for the create comment form
 * extract the form data and send a request to the API to create a comment
 * If the comment is created successfully, display a success message and reload the page
 * If the comment fails to create, display an error message and reload the page
 */

export function setCreateCommentFormListener() {
  const form = document.querySelector(".comment-form");

  if (form) {
    const postId = form.getAttribute("data-form-id");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      const postData = {};

      for (const [key, value] of formData.entries()) {
        postData[key] = value;
      }

      try {
        await commentToPost(postData, postId);
        form.innerHTML += `<p class="bg-success p-2 border rounded text-white">Comment created successfully, relaoding page!</p>`;
        // reload the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (error) {
        console.error("Error creating post:", error);
        form.innerHTML += `<p class="bg-danger p-2 border rounded text-white">Error creating comment, please try again, realoading page!</p>`;
        // reload the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      }
    });
  }
}
