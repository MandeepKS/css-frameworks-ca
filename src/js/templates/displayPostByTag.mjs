// import { displayPosts } from "../api/posts/display.mjs";
import { createPostTemplate } from "./displayPosts.mjs";
import { displayPostsByTag } from "../api/posts/display.mjs";
//make a function that will display all the posts by a specific tag
export async function displayPostByTag(postData) {
  const container = document.querySelector(".feed-content");
  container.innerHTML = "";
  //   const feedTitle = document.querySelector(".bar-feed");
  //   const queryString = window.location.search;
  //   const urlParams = new URLSearchParams(queryString);
  //   const tag = urlParams.get("tag");
  const tag = postData;
  try {
    const posts = await displayPostsByTag(tag);
    const postsByTag = posts.filter((post) => post.tags.includes(tag));
    if (postsByTag.length === 0) {
      container.innerHTML = "<h1>No posts found</h1>";
      return;
    }
    //if posts found replace the content of the container with the posts
    // feedTitle.textContent += `Posts by tag: ${tag}`;
    container.innerHTML = "";
    container.innerHTML = `<div><h3>Posts by tag: ${tag}</h3></div>
    <a href='/feed/'>Back to feed</a>`;
    postsByTag.forEach((post) => {
      container.appendChild(createPostTemplate(post));
    });
  } catch (error) {
    console.log(error);
    container.innerHTML = `<h1>Sorry, posts by the tag of ${tag} not found</h1>
        <p><a href='/feed/'>Click here to go back to the feed</a></p>`;
  }
}
