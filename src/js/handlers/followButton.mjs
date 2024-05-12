import { followUser } from "../api/profile/follow.mjs";

const url = window.location.href;
const username = new URL(url).searchParams.get("name");

/**
 * sets the follow button listener
 * @param {string} username the username of the profile to follow
 * if an error occurs during the process it will be logged to the console
 *
 */

export function setFollowBtnListener() {
  const followBtn = document.querySelector("#followBtn");
  if (!followBtn) {
    return;
  }
  followBtn.addEventListener("click", async () => {
    const followStatus = await followUser(username);
    if (followStatus.statusCode != 400) {
      window.location.reload();
    } else {
      console.error("Error following user");
    }
  });
}
