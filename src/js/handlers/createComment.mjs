import { commentToPost } from "../api/posts/commentToPost.mjs";

export function setCreateCommentFormListener() {
  const form = document.querySelector(".comment-form");
  const commentsList = document.querySelector(".comments-list");

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
