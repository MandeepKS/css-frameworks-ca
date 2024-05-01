import { profileInfo } from "../api/authFetch.mjs";
import { displayProfile } from "../api/profile/display.mjs";
import { createPostTemplate } from "./displayPosts.mjs";
import { displayProfilePosts } from "../api/profile/posts.mjs";
import { load } from "../storage/index.mjs";

const storage = load("profile");
const url = new URL(location.href);
const profileName = url.searchParams.get("name") || `${storage.name}`;

const profileInformation = await displayProfilePosts(profileName);
console.log(profileInformation);

export async function renderProfile(profile) {
  //   const profile = profileInfo();
  const profileInfo = await displayProfile(profileName);
  console.log(profileInfo);
  const profilePosts = profileInfo.posts;
  console.log(profilePosts);
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
  following.classList.add("m-0");
  following.textContent = profileInfo._count.following + " following";
  const followers = document.createElement("p");
  followers.classList.add("m-0");
  followers.textContent = profileInfo._count.followers + " followers";

  followStats.append(following, followers);
  followInfo.append(name, followStats);

  const profileContainer = document.querySelector(".profile-info");
  profileContainer.innerHTML += `
                            <div class="profile-img d-flex justify-content-center  start-0 end-0">
                                <img src=${avatarURL} class="img-fluid rounded-circle object-fit-cover mt-lg-n7" alt="${profileInfo.name} profile image">
                            </div>
                            <p class="fw-bold fst-italic text-center pt-2">@${profileInfo.name}</p>
                            <div class="p-3 bio text-center">

                            <p>${profileInfo._count.posts} posts</p>
                        </div>
                        <div class="follow-button d-flex justify-content-center mb-3">
                            <input class="col-4 col-sm-3 col-lg-4 btn btn-primary" type="submit" value="Follow">
                        </div>
  `;

  const feedPosts = document.querySelector(".feed-content");
  profileInformation.forEach((post) => {
    feedPosts.appendChild(createPostTemplate(post));
  });
}
