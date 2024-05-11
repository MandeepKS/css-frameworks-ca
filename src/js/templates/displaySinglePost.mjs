import { displayPost } from "../api/posts/display.mjs";
import { createPostTemplate } from "./displayPosts.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postID = urlParams.get("id");
// console.log(postID);

// render a single post by ID
export async function displaySinglePost() {
  const container = document.querySelector(".feed-content");
  container.innerHTML = "";
  try {
    const singlePost = await displayPost(postID);
    //IF POST NOT FOUND
    // if (singlePost === undefined) {
    //   container.innerHTML = "<h1>Post not found</h1>";
    //   return;
    // }

    container.appendChild(createPostTemplate(singlePost));
    console.log(singlePost);
  } catch (error) {
    console.log(error);
    container.innerHTML = `<h1>Sorry, post by the ID of ${postID} not found</h1>
    <p><a href='/feed/'>Click here to go back to the feed</a></p>`;
  }
}

// displaySinglePost();
