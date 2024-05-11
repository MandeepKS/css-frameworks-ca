import { load } from "../storage/index.mjs";
import { postTemplate } from "./postTemplate.mjs";
// import { profilePostTemplate } from "./postTemplate.mjs";
import { mediaPostTemplate } from "./postTemplate.mjs";
// import { mediaProfilePostTemplate } from "./postTemplate.mjs";
import { load as profileName } from "../storage/index.mjs";
const filterAllBtn = document.querySelector("#radioWoopsies");
const filterMediaBtn = document.querySelector("#radioReplies");
const feedPosts = document.querySelector(".feed-posts");
const path = location.pathname;
const name =
  new URL(location.href).searchParams.get("name") ||
  profileName("profile").name;

export function filterPosts() {
  filterAllBtn.addEventListener("click", () => {
    if (filterMediaBtn.hasAttribute("checked")) {
      filterMediaBtn.removeAttribute("checked");
    }
    if (!filterAllBtn.hasAttribute("checked")) {
      filterAllBtn.setAttribute("checked", "");
    }
    feedPosts.innerHTML = "";
    if (path === "/feed/") {
      postTemplate();
    }
    // else if (path === "/profile/") {
    //   profilePostTemplate(name);
    // }
  });
  filterMediaBtn.addEventListener("click", () => {
    // add checked attribute to the radio button
    filterMediaBtn.setAttribute("checked", "");
    filterAllBtn.removeAttribute("checked");
    feedPosts.innerHTML = "";
    feedPosts.innerHTML = "";
    if (path === "/feed/") {
      mediaPostTemplate();
    }
    // else if (path === "/profile/") {
    //   mediaProfilePostTemplate(name);
    // }
  });
}
