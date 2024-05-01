import { updatePost } from "../api/posts/index.mjs";

export function setUpdatePostFormListener() {
  const form = document.querySelector("#update-post");

  const url = new URL(location.href);
  const postId = url.searchParams.get("id");

  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const post = Object.fromEntries(formData.entries());
      post.id = postId;

      updatePost(post);
    });
  }
}
