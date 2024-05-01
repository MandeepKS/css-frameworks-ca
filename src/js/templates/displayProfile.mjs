import { profileInfo } from "../api/authFetch.mjs";
import { displayProfile } from "../api/profile/display.mjs";
export function renderProfile() {
  const profile = profileInfo();
  const followInfo = document.querySelector(".name-stats");
  const name = document.createElement("div");
  name.classList.add("profile-name", "me-2", "mb-0", "h3");
  name.textContent = profile.name;
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
  following.textContent = "702 following";
  const followers = document.createElement("p");
  followers.classList.add("m-0");
  followers.textContent = "1,699 followers";

  followStats.append(following, followers);
  followInfo.append(name, followStats);

  const profileContainer = document.querySelector(".profile-info");
  profileContainer.innerHTML += `
                            <div class="profile-img d-flex justify-content-center start-0 end-0">
                                <img src="/src/images/profile-img-round.png" class="img-fluid mt-lg-n7" alt="Profile user image">
                            </div>
                            <p class="fw-bold fst-italic text-center pt-2">@${profile.name}</p>
                            <div class="p-3 bio text-center">
                            <p>Hi, I’m a 34yo woman from Norway living my best life</p>
                        </div>
                        <div class="follow-button d-flex justify-content-center mb-3">
                            <input class="col-4 col-sm-3 col-lg-4 btn btn-primary" type="submit" value="Follow">
                        </div>
  `;
  console.log(profileInfo());
}
