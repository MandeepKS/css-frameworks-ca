import { displayPost } from "../api/posts/display.mjs";
import { createPostTemplate } from "./displayPosts.mjs";
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postID = urlParams.get("id");
console.log(postID);

const singlePost = await displayPost(postID);

// render a single post by ID
export function displaySinglePost() {
  const container = document.querySelector(".feed-content");
  container.appendChild(createPostTemplate(singlePost));
  console.log(singlePost);
}

// displaySinglePost();
