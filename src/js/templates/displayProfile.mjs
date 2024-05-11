import { profileInfo } from "../api/authFetch.mjs";
import { displayProfile } from "../api/profile/display.mjs";
import { createPostTemplate } from "./displayPosts.mjs";
import { createProfilePostTemplate } from "./profilePosts.mjs";
import { displayPosts } from "../api/posts/display.mjs";
import { load } from "../storage/index.mjs";
import { setFollowBtnListener } from "../handlers/index.mjs";
import { setUnfollowBtnListener } from "../handlers/index.mjs";
import { setEditProfileBtnListener } from "../handlers/index.mjs";

const profileHeader = document.querySelector(".profile-header-img");

export async function renderProfile() {
  const storage = load("profile");
  const url = new URL(location.href);
  const profileName = url.searchParams.get("name") || `${storage.name}`;
  const profileInfo = await displayProfile(profileName);
  if (profileInfo.statusCode === 404) {
    return;
  }
  console.log(profileInfo);
  const followingList = profileInfo.following;
  const followersList = profileInfo.followers;
  profileHeader.src = profileInfo.banner || "/src/images/header-bg.png";
  const avatarURL = profileInfo.avatar || "/src/images/default-avatar.png";
  const followInfo = document.querySelector(".name-stats");
  const name = document.createElement("div");
  name.classList.add("profile-name", "me-2", "mb-0", "h3");
  name.textContent = profileInfo.name;
  const followStats = document.createElement("div");
  followStats.classList.add(
    "follow-stats",
    "gap-3",
    "d-flex",
    "flex-wrap",
    "fst-italic"
  );
  const following = document.createElement("p");
  following.classList.add("following", "m-0");
  following.textContent = profileInfo._count.following + " following";
  const followers = document.createElement("p");
  followers.classList.add("followers", "m-0");
  followers.textContent = profileInfo._count.followers + " followers";

  followStats.append(following, followers);
  followInfo.append(name, followStats);

  const bio = storage.bio || "<i>No bio added by user yet.</i>";

  const profileContainer = document.querySelector(".profile-info");
  profileContainer.innerHTML += `
                            <div class="profile-img d-flex justify-content-center  start-0 end-0">
                                <img src=${avatarURL} class="img-fluid rounded-circle object-fit-cover mt-lg-n7" alt="${profileInfo.name} profile image">
                            </div>
                            <p class="fw-bold fst-italic text-center pt-2">@${profileInfo.name}</p>
                            <div class="p-3 bio text-center">
                            <p>${bio}</p>
                            <p>${profileInfo._count.posts} posts</p>
                        </div>
                        <div class="follow-button d-flex justify-content-center">
                            <input class="col-6 col-sm-4 col-lg-6 btn btn-primary" id="followBtn" type="submit" value="Follow">
                        </div>
                        <div class="unfollow-button d-flex justify-content-center">
                            <input class="col-6 col-sm-4 col-lg-6 btn btn-primary" id="unfollowBtn" type="submit" value="Unfollow" hidden>
                        </div>
                        <div class="edit-button d-flex justify-content-center">
                            <input class="col-6 col-sm-4 col-lg-6 btn btn-outline-primary" type="button" hidden="hidden" value="Edit Profile">
                        </div>
  `;

  // Hide/show follow/unfollow button based on user's follow status
  const unfollowBtn = document.querySelector("#unfollowBtn");
  const followBtn = document.querySelector("#followBtn");

  followersList.forEach((follower) => {
    if (follower.name === storage.name) {
      followBtn.setAttribute("hidden", "hidden");
      unfollowBtn.removeAttribute("hidden");
    }
  });

  // Show edit button if user is viewing their own profile, and hide follow button
  const editButton = document.querySelector(".edit-button");

  if (profileInfo.name === storage.name) {
    editButton.children[0].removeAttribute("hidden");
    followBtn.remove();
  }

  // run all the profile page event listeners
  setFollowBtnListener();
  setUnfollowBtnListener();
  setEditProfileBtnListener();
}

//so far unused bio field
//<label for="bio" class="form-label">Bio:</label>
//<input type="text" id="bio" name="bio" class="form-control mb-3">
