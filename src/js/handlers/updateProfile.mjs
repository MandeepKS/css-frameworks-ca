import { displayProfile, updateProfile } from "../api/profile/index.mjs";
import { load } from "../storage/index.mjs";

/**
 * Event listener for the update profile form
 * Extract the form data and send a request to the API to update the profile
 * @param {string} name - The name of the profile
 * @param {string} bio - The bio of the profile, this is not used in the current implementation
 * @param {object} form - The form data to be updated
 * @param {string} form.avatar - gets the current avatar url of the profile in the input field
 * @param {string} form.banner - gets the current banner url of the profile in the input field
 * The new profile data is then displayed on the profile page
 */

export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#edit-profile");

  if (form) {
    const { name, bio } = load("profile");
    const button = form.querySelector(".update-profile-btn");
    button.disabled = true;

    const profile = await displayProfile(name);

    // form.bio.value = bio;
    form.avatar.value = profile.avatar;
    form.banner.value = profile.banner;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;

      // try {
      updateProfile(profile);
      const profileImg = document.querySelector(".profile-img img");
      const profileBanner = document.querySelector(".profile-header-img");
      profileImg.src = profile.avatar;
      profileBanner.src = profile.banner || "/src/images/header-bg.png";

      // window.location.reload();
      // } catch (error) {
      //   console.error("Error updating profile:", error); // Check if there are any errors during the update process
      // }
    });
  }
}
