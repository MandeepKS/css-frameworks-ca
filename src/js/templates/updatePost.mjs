// import { displayPost } from "../api/posts/display.mjs";
// export async function updatePost() {
//   const updatePostForm = document.querySelector("#update-post");
//   console.log(updatePostForm);
//   const url = new URL(location.href);
//   const postId = url.searchParams.get("id");
//   const post = await displayPost(postId);
//   const title = updatePostForm.querySelector(".title-input");
//   title.value = post.title;
//   const body = updatePostForm.querySelector(".body-input");
//   body.value = post.body;
//   const media = updatePostForm.querySelector(".media-input");
//   media.value = post.media;
//   const tags = updatePostForm.querySelector(".tags-input");
//   tags.value = post.tags;
//   console.log(postId);
//   console.log(post);

//   updatePostForm.addEventListener("submit", async (event) => {
//     event.preventDefault();
//     const formData = new FormData(updatePostForm);
//     const updatedPost = Object.fromEntries(formData.entries());
//     updatedPost.id = postId;
//     await updatePost(updatedPost);
//     window.location.href = "/feed/";
//   });
// }
