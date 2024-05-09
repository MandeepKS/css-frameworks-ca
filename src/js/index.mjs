// import { registerFormListener } from "./handlers/register.mjs";
// import { loginFormListener } from "./handlers/login.mjs";
import * as handlers from "./handlers/index.mjs";
// import * as templates from "./templates/displayPosts.mjs";
import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as profile from "./api/profile/index.mjs";
import * as post from "./api/posts/index.mjs";
import { displayProfile } from "./api/profile/display.mjs";
import { load } from "./storage/index.mjs";
import { displayUsername } from "./templates/displayUsername.mjs";

handlers.setLogoutListener();

const loggedIn = load("profile");

// console.log(user);

// export async function postTemplate() {
//   const posts = await postMethods.displayPosts();
//   const feedPosts = document.querySelector(".feed-content");
//   feedPosts.innerHTML = "";
//   templates.renderPostTemplate(posts, feedPosts);
// }

const path = location.pathname;
const url = new URL(location.href);
let name = url.searchParams.get("name");
if (loggedIn) {
  if (name === null) {
    name = loggedIn.name;
  }
}

const tag = url.searchParams.get("tag");

switch (path) {
  case "/profile/login/":
    handlers.loginFormListener();
    break;
  case "/profile/register/":
    handlers.registerFormListener();
    break;
  case "/feed/":
    handlers.loggedInStatus();
    handlers.setCreatePostFormListener();
    handlers.postTemplate();
    handlers.setPostMenuDeleteBtnListener();
    handlers.setCreateCommentFormListener();
    handlers.searchProfile();
    // handlers.searchResult();
    displayUsername();
    break;
  case "/profile/":
    handlers.loggedInStatus();
    const user = loggedIn.name;
    displayUsername();
    templates.renderProfile(user);
    handlers.setUpdateProfileFormListener();
    handlers.profilePostTemplate(name);
    // handlers.setPostMenuListener();
    break;
  case `/profile/?name=${name}`:
    handlers.loggedInStatus();
    templates.renderProfile(name);
    // displayUsername();
    break;
  case "/feed/post/":
    handlers.loggedInStatus();
    displayUsername();
    templates.displaySinglePost();
    break;
  case "/feed/post/edit/":
    handlers.loggedInStatus();
    handlers.setUpdatePostFormListener();
    displayUsername();
    break;
  // case `/feed/?_tag=${tag}`:
  //   console.log(tag);
  //   handlers.displayPostByTag();
  //   break;
  default:
    // Handle default case if none of the paths match
    location.href = "/feed/";
    break;
}
// if (path === "/profile/login/") {
//   handlers.loginFormListener();
// } else if (path === "/profile/register/") {
//   handlers.registerFormListener();
// } else if (path === "/feed/") {
//   handlers.setCreatePostFormListener();
//   postTemplate();
// } else if (path === `/profile/`) {
//   handlers.setLogoutListener();
//   templates.renderProfile("fridafever");
// } else if (path === `/profile/?name=${name}`) {
//   templates.renderProfile(name).then(console.log);
// } else if (path === "/feed/post/") {
//   templates.displaySinglePost();
// }

// console.log(await displayProfile("fridafever"));

// post.createPost();
// post.updatePost();
// post.removePost();
// post.displayPost(11909).then(console.log);
// post.displayPosts().then(console.log);

// post.createPost({
//   title: "this is a test",
//   body: "please ignore",
// });

// post.updatePost({
//   id: "11940",
//   title: "My first post UPDATED twice",
//   body: "This is my first post UPDATED twice",
// });

// post.removePost(12120);
