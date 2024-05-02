import { createPost } from "../api/posts/create.mjs";
import { postTemplate } from "../index.mjs";
// export function setCreatePostFormListener() {
//   const form = document.querySelector("#create-post");

//   form.addEventListener("submit", (event) => {
//     event.preventDefault();
//     const form = event.target;
//     const formData = new FormData(form);
//     const post = Object.fromEntries(formData.entries());

//     createPost(post);
//   });
// }

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
