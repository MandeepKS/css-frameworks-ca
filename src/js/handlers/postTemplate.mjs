import { displayPosts } from "../api/posts/display.mjs";
import { displayProfile } from "../api/profile/display.mjs";
import { renderPostTemplate } from "../templates/displayPosts.mjs";
import { renderProfilePosts } from "../templates/profilePosts.mjs";

export async function postTemplate() {
  const posts = await displayPosts();
  const feedPosts = document.querySelector(".feed-content");
  feedPosts.innerHTML = "";
  renderPostTemplate(posts, feedPosts);
}

export async function profilePostTemplate(name) {
  try {
    const posts = await displayProfile(name);

    const feedPosts = document.querySelector(".feed-content");
    if (posts.statusCode === 404) {
      feedPosts.innerHTML = "<h1>Profile/posts not found</h1>";
      return;
    }
    feedPosts.innerHTML = "";
    renderProfilePosts(posts, feedPosts);
  } catch (error) {
    console.log(error);
    feedPosts.innerHTML = "<h1>Posts not found</h1>";
  }
}
