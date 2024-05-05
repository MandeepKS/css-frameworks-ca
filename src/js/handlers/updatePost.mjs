import { updatePost } from "../api/posts/index.mjs";
import { displayPost } from "../api/posts/display.mjs";

export async function setUpdatePostFormListener() {
  const form = document.querySelector("#update-post");
  if (form) {
    console.log(form);
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
    console.log(postId);
    console.log(post);

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
      // const post = Object.fromEntries(formData.entries());

      post.id = postId;

      try {
        updatePost(postData);
        console.log(postData); // Check if profile name is fetched correctly
        console.log("Update successful"); // Check if updateProfile function is called successfully
        window.location.href = `/feed/post/?id=${postId}`;
      } catch (error) {
        console.error("Error updating profile:", error); // Check if there are any errors during the update process
      }
    });
  }
}
