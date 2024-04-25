import { registerFormListener } from "./handlers/register.mjs";
import { loginFormListener } from "./handlers/login.mjs";
// import * as post from "./api/posts/index.mjs";

// loginFormListener();
// registerFormListener();

const path = location.pathname;

if (path === "/profile/login/") {
  loginFormListener();
} else if (path === "/profile/register/") {
  registerFormListener();
}

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
