import { profileInfo } from "../api/authFetch.mjs";
import { displayProfile } from "../api/profile/display.mjs";
import { createPostTemplate } from "./displayPosts.mjs";
import { createProfilePostTemplate } from "./profilePosts.mjs";
// import { displayProfilePosts } from "../api/profile/posts.mjs";
import { displayPosts } from "../api/posts/display.mjs";
import { load } from "../storage/index.mjs";

// posts.forEach((post) => {
//   if (post.author.name === profileName) {
//     console.log("All posts", post);
//   }
// });
// console.log("Posts by profile", profileInformation);

const profileHeader = document.querySelector(".profile-header-img");

export async function renderProfile() {
  const storage = load("profile");
  const url = new URL(location.href);
  const profileName = url.searchParams.get("name") || `${storage.name}`;
  // const profileInformation = await displayProfilePosts(profileName);
  //   const profile = profileInfo();
  const profileInfo = await displayProfile(profileName);
  if (profileInfo.statusCode === 404) {
    return;
  }
  console.log(profileInfo);
  // const allProfilePosts = profileInfo.posts;
  // console.log(allProfilePosts);
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
  following.classList.add("m-0");
  following.textContent = profileInfo._count.following + " following";
  const followers = document.createElement("p");
  followers.classList.add("m-0");
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
                        <div class="follow-button d-flex justify-content-center mb-3">
                            <input class="col-4 col-sm-3 col-lg-4 btn btn-primary" type="submit" value="Follow">
                        </div>
                        <div class="edit-button d-flex justify-content-center mb-3">
                            <input class="col-6 col-sm-3 col-lg-6 btn btn-outline-primary" type="button" hidden="hidden" value="Edit Profile">
                        </div>
  `;

  const followButton = document.querySelector(".follow-button");
  const editButton = document.querySelector(".edit-button");
  const editContainer = document.querySelector(".profile-edit");
  const editForm = document.querySelector("#edit-profile");
  const btnContainer = document.querySelector(".btn-container");

  if (profileInfo.name === storage.name) {
    editButton.children[0].removeAttribute("hidden");
    followButton.children[0].remove();
  }

  // editButton.addEventListener("click", () => {
  //   editContainer.style.display = "block";
  //   editButton.children[0].setAttribute("hidden", "hidden");
  // });

  editButton.addEventListener("click", () => {
    editContainer.style.display = "block";
    editButton.children[0].setAttribute("hidden", "hidden");
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("btn", "btn-outline-primary", "mb-4", "ms-1");
    cancelBtn.textContent = "Cancel";
    btnContainer.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
      editButton.children[0].removeAttribute("hidden");
      editContainer.style.display = "none";
      cancelBtn.remove();
    });
  });
}
//<label for="bio" class="form-label">Bio:</label>
//<input type="text" id="bio" name="bio" class="form-control mb-3">
