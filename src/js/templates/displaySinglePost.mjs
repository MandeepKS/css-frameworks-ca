import { displayPost } from "../api/posts/display.mjs";
import { createPostTemplate } from "./displayPosts.mjs";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const postID = urlParams.get("id");

/**
 * a function that displays a single post by the ID passed to the URL
 * if the post is not found, it will display an error message
 * if the post is found, it will display the post
 * @param {string} postID - The ID of the post
 */

export async function displaySinglePost() {
  const container = document.querySelector(".feed-content");
  container.innerHTML = "";
  try {
    const singlePost = await displayPost(postID);

    container.appendChild(createPostTemplate(singlePost));
  } catch (error) {
    console.log(error);
    container.innerHTML = `<h1>Sorry, post by the ID of ${postID} not found</h1>
    <p><a href='/feed/'>Click here to go back to the feed</a></p>`;
  }
}
