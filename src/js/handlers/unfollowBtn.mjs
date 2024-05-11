import { unfollowUser } from "../api/profile/index.mjs";

const url = window.location.href;
const username = new URL(url).searchParams.get("name");

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
      console.log("Error unfollowing user");
    }
  });
}
