import { displayProfiles } from "../api/profile/display.mjs";
import { displayPosts } from "../api/posts/index.mjs";

/**
 * function to search for a profile
 * takes in the search term and compares it to the names in the profile list
 * if a match is found, the user is redirected to the profile page and it exits the function
 * if no match is found, a message is displayed
 * only searches for profiles with more than one post
 * only searches the last 3000 names in the alphabet to not get kicked out of the API
 */

export async function searchProfile() {
  const searchContainer = document.querySelector(".search-container");
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#searchTerm");
  const searchBtn = document.querySelector(".search-btn");
  const feedPosts = document.querySelector(".feed-content");
  const searchTerm = searchInput.value;

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (searchInput.value === "") {
      searchInput.placeholder = "Enter a name to search";
      return;
    }

    const limit = 100;
    let offset = 0;
    try {
      while (true) {
        const searchResults = await displayProfiles(limit, offset);
        // searchResults.forEach((profile) => {
        //   if (profile._count.posts > 1) {
        //     console.log(profile.name);
        //   }
        // });

        // Search for a match in the current page
        for (const profile of searchResults) {
          if (profile.name.toLowerCase() === searchInput.value.toLowerCase()) {
            // Redirect to profile page if a match is found
            location.href = `/profile/?name=${profile.name}`;
            return; // Exit the function early
          }
        }
        // fetch the next page of profiles
        offset += limit;
        searchBtn.innerText = "Searching...";
        searchBtn.disabled = true;

        //Exit the loop if the offset is greater than 3000
        if (offset >= 3000) {
          searchBtn.disabled = false;
          searchBtn.innerText = "Search";
          searchContainer.innerHTML +=
            "<p>Profile not found within the last 3000 in the alphabet</p>";
          break;
        }

        // Exit the loop if the offset is greater than the total number of profiles (not possible due tot he high amount of profiles in the database)
        // if (offset >= searchResults.total) {
        //   break;
        // }
      }
      searchForm.reset();
    } catch (error) {
      console.log(error);
    }
  });
}
