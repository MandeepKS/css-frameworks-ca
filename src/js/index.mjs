import { registerFormListener } from "./handlers/register.mjs";
import { loginFormListener } from "./handlers/login.mjs";

import * as templates from "./templates/displayPosts.mjs";
import * as postMethods from "./api/posts/index.mjs";
// import * as post from "./api/posts/index.mjs";

const path = location.pathname;

if (path === "/profile/login/") {
  loginFormListener();
} else if (path === "/profile/register/") {
  registerFormListener();
}

async function testTemplate() {
  const posts = await postMethods.displayPosts();
  const feedPosts = document.querySelector(".feed-content");
  templates.renderPostTemplate(posts, feedPosts);
}

testTemplate();
// post.createPost();
// post.updatePost();
// post.removePost();
// post.displayPost(11909).then(console.log);
// post.displayPosts().then(console.log);

// post.createPost({
//   title: "My first post",
//   body: "This is my first post",
// });

// post.updatePost({
//   id: "11940",
//   title: "My first post UPDATED twice",
//   body: "This is my first post UPDATED twice",
// });

// post.removePost(11940);
