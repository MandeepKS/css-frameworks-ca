import { postTemplate } from "./postTemplate.mjs";
import { mediaPostTemplate } from "./postTemplate.mjs";
const filterAllBtn = document.querySelector("#radioWoopsies");
const filterMediaBtn = document.querySelector("#radioReplies");
const feedPosts = document.querySelector(".feed-posts");
const path = location.pathname;

/**
 * Filter posts in feed by media or all posts
 * based on the radio button checked/unchecked status
 * default is all posts
 */

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
  });
}
