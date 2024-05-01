import { createPost } from "../api/posts/create.mjs";

export function setCreatePostFormListener() {
  const form = document.querySelector("#create-post");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const post = Object.fromEntries(formData.entries());

    createPost(post);
  });
}
