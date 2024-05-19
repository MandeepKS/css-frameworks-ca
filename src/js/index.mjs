import * as handlers from "./handlers/index.mjs";
import * as templates from "./templates/index.mjs";
import { load } from "./storage/index.mjs";
import { displayUsername } from "./templates/displayUsername.mjs";
// import * as post from "./api/posts/index.mjs";

handlers.setLogoutListener();
handlers.backToTopBtnHandler();

const loggedIn = load("profile");

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
    handlers.loggedInStatus();
    break;
  case "/profile/register/":
    handlers.registerFormListener();
    handlers.loggedInStatus();
    break;
  case "/feed/":
    handlers.loggedOutStatus();
    handlers.setCreatePostFormListener();
    handlers.postTemplate();
    handlers.setCreateCommentFormListener();
    handlers.searchFeed();
    handlers.filterPosts();
    displayUsername();
    break;
  case "/profile/":
    handlers.loggedOutStatus();
    const user = loggedIn.name;
    displayUsername();
    templates.renderProfile(user);
    handlers.setUpdateProfileFormListener();
    handlers.profilePostTemplate(name);
    break;
  case `/profile/?name=${name}`:
    handlers.loggedOutStatus();
    templates.renderProfile(name);
    break;
  case "/feed/post/":
    handlers.loggedOutStatus();
    displayUsername();
    templates.displaySinglePost();
    break;
  case "/feed/post/edit/":
    handlers.loggedOutStatus();
    handlers.setUpdatePostFormListener();
    displayUsername();
    break;
  default:
    // Handle default case if none of the paths match
    location.href = "/feed/";
    break;
}

// post.removePost(12120);
