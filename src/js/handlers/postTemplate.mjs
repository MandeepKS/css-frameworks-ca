import { displayPosts } from "../api/posts/display.mjs";
import { renderPostTemplate } from "../templates/displayPosts.mjs";

export async function postTemplate() {
  const posts = await displayPosts();
  const feedPosts = document.querySelector(".feed-content");
  feedPosts.innerHTML = "";
  renderPostTemplate(posts, feedPosts);
}
