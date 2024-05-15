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

/**
 * a function that renders the profile page
 * if no profile is found, return
 * if a profile is found, display the profile information
 * @param {string} profileName name of the profile to display fetched from the URL
 * @param {array} storage user's profile information from local storage, replaces profileName if not found in URL
 * if an error occurs during the process, log the error
 */

export async function renderProfile() {
  const storage = load("profile");
  const url = new URL(location.href);
  const profileName = url.searchParams.get("name") || `${storage.name}`;
  const profileInfo = await displayProfile(profileName);
  if (profileInfo.statusCode === 404) {
    return;
  }
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

  const bio = storage.bio || "No bio added by user yet.";

  const profileContainer = document.querySelector(".profile-info");

  // Create profile image element
  const profileImgContainer = document.createElement("div");
  profileImgContainer.classList.add(
    "profile-img",
    "d-flex",
    "justify-content-center",
    "start-0",
    "end-0"
  );
  const profileImg = document.createElement("img");
  profileImg.src = avatarURL;
  profileImg.classList.add(
    "img-fluid",
    "rounded-circle",
    "object-fit-cover",
    "mt-lg-n7"
  );
  profileImg.alt = `${profileInfo.name} profile image`;
  profileImgContainer.appendChild(profileImg);

  // Create profile name element
  const profileUsername = document.createElement("p");
  profileUsername.classList.add("fw-bold", "fst-italic", "text-center", "pt-2");
  profileUsername.textContent = `@${profileInfo.name}`;

  // Create bio element
  const bioContainer = document.createElement("div");
  bioContainer.classList.add("p-3", "bio", "text-center");
  const bioParagraph = document.createElement("p");
  bioParagraph.textContent = bio;
  const postsCount = document.createElement("p");
  postsCount.textContent = `${profileInfo._count.posts} posts`;
  bioContainer.appendChild(bioParagraph);
  bioContainer.appendChild(postsCount);

  // Create follow button
  const followButtonContainer = document.createElement("div");
  followButtonContainer.classList.add(
    "follow-button",
    "d-flex",
    "justify-content-center"
  );
  const followButton = document.createElement("input");
  followButton.classList.add(
    "col-6",
    "col-sm-4",
    "col-lg-6",
    "btn",
    "btn-primary"
  );
  followButton.setAttribute("id", "followBtn");
  followButton.setAttribute("type", "submit");
  followButton.setAttribute("value", "Follow");
  followButtonContainer.appendChild(followButton);

  // Create unfollow button
  const unfollowButtonContainer = document.createElement("div");
  unfollowButtonContainer.classList.add(
    "unfollow-button",
    "d-flex",
    "justify-content-center"
  );
  const unfollowButton = document.createElement("input");
  unfollowButton.classList.add(
    "col-6",
    "col-sm-4",
    "col-lg-6",
    "btn",
    "btn-primary"
  );
  unfollowButton.setAttribute("id", "unfollowBtn");
  unfollowButton.setAttribute("type", "submit");
  unfollowButton.setAttribute("value", "Unfollow");
  unfollowButton.setAttribute("hidden", "hidden");
  unfollowButtonContainer.appendChild(unfollowButton);

  // Create edit button
  const editButtonContainer = document.createElement("div");
  editButtonContainer.classList.add(
    "edit-button",
    "d-flex",
    "justify-content-center"
  );
  const editProfileButton = document.createElement("input");
  editProfileButton.classList.add(
    "col-6",
    "col-sm-4",
    "col-lg-6",
    "btn",
    "btn-outline-primary"
  );
  editProfileButton.setAttribute("type", "button");
  editProfileButton.setAttribute("hidden", "hidden");
  editProfileButton.setAttribute("value", "Edit Profile");
  editButtonContainer.appendChild(editProfileButton);

  // Append all created elements to profile container
  profileContainer.appendChild(profileImgContainer);
  profileContainer.appendChild(profileUsername);
  profileContainer.appendChild(bioContainer);
  profileContainer.appendChild(followButtonContainer);
  profileContainer.appendChild(unfollowButtonContainer);
  profileContainer.appendChild(editButtonContainer);

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
