import { displayProfile, updateProfile } from "../api/profile/index.mjs";
import { load } from "../storage/index.mjs";

// export async function setUpdateProfileFormListener() {
//   const form = document.querySelector("#edit-profile");

//   if (form) {
//     const { name, bio } = load("profile");
//     const button = form.querySelector(".update-profile-btn");
//     button.disabled = true;

//     const profile = await displayProfile(name);
//     console.log(profile);

//     // form.bio.value = bio;
//     form.avatar.value = profile.avatar;
//     form.banner.value = profile.banner;

//     button.disabled = false;

//     form.addEventListener("submit", (event) => {
//       event.preventDefault();
//       const form = event.target;
//       const formData = new FormData(form);
//       const profile = Object.fromEntries(formData.entries());
//       updateProfile(profile);
//       console.log("did I click?");
//     });
//   }
// }

export async function setUpdateProfileFormListener() {
  const form = document.querySelector("#edit-profile");

  if (form) {
    const { name, bio } = load("profile");
    const button = form.querySelector(".update-profile-btn");
    button.disabled = true;

    const profile = await displayProfile(name);
    console.log(profile); // Check if profile data is fetched correctly

    // form.bio.value = bio;
    form.avatar.value = profile.avatar;
    form.banner.value = profile.banner;

    button.disabled = false;

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      console.log("Form submitted"); // Check if form submission event is triggered

      const formData = new FormData(form);
      const profile = Object.fromEntries(formData.entries());

      profile.name = name;
      console.log("Profile data:", profile); // Check profile data before sending the request

      try {
        updateProfile(profile);
        console.log(profile); // Check if profile name is fetched correctly
        console.log("Update successful"); // Check if updateProfile function is called successfully
      } catch (error) {
        console.error("Error updating profile:", error); // Check if there are any errors during the update process
      }
    });
  }
}
