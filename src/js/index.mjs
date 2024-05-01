// import { registerFormListener } from "./handlers/register.mjs";
// import { loginFormListener } from "./handlers/login.mjs";
import * as handlers from "./handlers/index.mjs";
// import * as templates from "./templates/displayPosts.mjs";
import * as templates from "./templates/index.mjs";
import * as postMethods from "./api/posts/index.mjs";
import * as post from "./api/posts/index.mjs";
import { displayProfile } from "./api/profile/display.mjs";

const path = location.pathname;

if (path === "/profile/login/") {
  handlers.loginFormListener();
} else if (path === "/profile/register/") {
  handlers.registerFormListener();
} else if (path === "/feed/") {
  handlers.setCreatePostFormListener();
} else if (path === "/profile/") {
  handlers.setLogoutListener();
  templates.renderProfile();
}

async function testTemplate() {
  const posts = await postMethods.displayPosts();
  const feedPosts = document.querySelector(".feed-content");
  templates.renderPostTemplate(posts, feedPosts);
}

testTemplate();
console.log(await displayProfile("fridafever"));

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

// post.removePost(12005);
