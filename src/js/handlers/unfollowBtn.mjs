import { unfollowUser } from "../api/profile/index.mjs";

const url = window.location.href;
const username = new URL(url).searchParams.get("name");

/**
 * Event listener for the unfollow button
 * if no button is found, return
 * button click unfollows a user
 * Then reloads the page
 * @param {string} username username of the profile to unfollow
 * if an error occurs during the process, log the error
 */

export function setUnfollowBtnListener() {
  const unfollowBtn = document.querySelector("#unfollowBtn");
  if (!unfollowBtn) {
    return;
  }
  unfollowBtn.addEventListener("click", async () => {
    const unfollow = await unfollowUser(username);
    if (unfollow.statusCode != 400) {
      window.location.reload();
    } else {
      console.error("Error unfollowing user");
    }
  });
}
