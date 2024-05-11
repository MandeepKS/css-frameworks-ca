import { followUser } from "../api/profile/follow.mjs";

const url = window.location.href;
const username = new URL(url).searchParams.get("name");

export function setFollowBtnListener() {
  const followers = document.querySelector(".followers");
  const followBtn = document.querySelector("#followBtn");
  const followDiv = document.querySelector(".follow-button");
  if (!followBtn) {
    return;
  }
  followBtn.addEventListener("click", async () => {
    const followStatus = await followUser(username);
    if (followStatus.statusCode != 400) {
      window.location.reload();
    } else {
      console.log("Error following user");
    }
  });
}
