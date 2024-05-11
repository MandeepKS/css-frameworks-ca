import { displayPosts } from "../api/posts/display.mjs";
import { displayProfile } from "../api/profile/display.mjs";
import { renderPostTemplate } from "../templates/displayPosts.mjs";
import { renderProfilePosts } from "../templates/profilePosts.mjs";
import { load } from "../storage/index.mjs";

export async function postTemplate() {
  const posts = await displayPosts();
  const feedPosts = document.querySelector(".feed-posts");
  feedPosts.innerHTML = "";
  renderPostTemplate(posts, feedPosts);
}

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

// export async function mediaProfilePostTemplate(profileName) {
//   try {
//     const profileData = await displayProfile(profileName);

//     const feedPosts = document.querySelector(".feed-posts");
//     if (profileData.statusCode === 404) {
//       feedPosts.innerHTML = "<h1>Profile and posts not found</h1>";
//       return;
//     }
//     feedPosts.innerHTML = "";
//     //filter out posts that have media
//     const postsFilter = profileData.posts.filter(
//       (post) => post.media !== "" && post.media !== null
//     );
//     console.log(postsFilter);

//     const { name, avatar, posts } = postsFilter;
//     renderProfilePosts(name, avatar, posts, feedPosts);
//   } catch (error) {
//     console.log(error);
//     // feedPosts.innerHTML = "<h1>Posts not found</h1>";
//   }
// }
