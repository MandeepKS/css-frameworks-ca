import { displayPosts } from "../api/posts/display.mjs";
import { displayProfile } from "../api/profile/display.mjs";
import { renderPostTemplate } from "../templates/displayPosts.mjs";
import { renderProfilePosts } from "../templates/profilePosts.mjs";
import { load } from "../storage/index.mjs";

/**
 * function to render posts on the feed
 */

export async function postTemplate() {
  const posts = await displayPosts();
  const feedPosts = document.querySelector(".feed-posts");
  feedPosts.innerHTML = "";
  renderPostTemplate(posts, feedPosts);
}

/**
 * function to render only posts with media on the feed
 */

export async function mediaPostTemplate() {
  const posts = await displayPosts();
  const feedPosts = document.querySelector(".feed-posts");
  feedPosts.innerHTML = "";
  //filter out posts that have media
  const postsFilter = posts.filter(
    (post) => post.media !== "" && post.media !== null
  );

  renderPostTemplate(postsFilter, feedPosts);
}

/**
 *
 * @param {string} profileName
 * display posts by a specific profileName
 * if no posts are found, display a message
 * if no posts are found and the profile is the logged in user, display a message to add a post
 * if the profile is not found, display a message
 * @param {string} name the name of the profile
 * @param {string} avatar the avatar url of the profile
 * @param {array} posts the posts by the profile
 * @param {HTMLElement} feedPosts the container to render the posts
 * if the profile is found, render the posts by the profile with the profile name and avatar
 *
 */

export async function profilePostTemplate(profileName) {
  try {
    const profileData = await displayProfile(profileName);

    const feedPosts = document.querySelector(".feed-posts");
    if (profileData.statusCode === 404) {
      feedPosts.innerHTML = "<h1>Profile and posts not found</h1>";
      return;
    }
    feedPosts.innerHTML = "";
    const { name, avatar, posts } = profileData;
    renderProfilePosts(name, avatar, posts, feedPosts);
    if (posts.length === 0) {
      feedPosts.innerHTML = `<div class="text-center"><p class="text-muted">No posts made by ${name}</p></div>`;
    }
    if (posts.length === 0 && name === load("profile").name) {
      feedPosts.innerHTML += `<div class="text-center"><a class="text-center text-primary" href="/feed/">Add your first post here</a></div>`;
    }
  } catch (error) {
    console.log(error);
    feedPosts.innerHTML = `<p>Posts not found</p>`;
  }
}
