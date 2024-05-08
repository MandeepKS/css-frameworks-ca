import { displayProfiles } from "../api/profile/display.mjs";
import { displayPosts } from "../api/posts/index.mjs";

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

    console.log(searchInput.value);

    const limit = 100;
    let offset = 0;
    try {
      while (true) {
        const searchResults = await displayProfiles(limit, offset);
        searchResults.forEach((profile) => {
          if (profile._count.posts > 3) {
            console.log(profile);
          }
          //   if (profile._count.posts.length > 0) {
          //     console.log(profile);
          //   }
          //   console.log(profile.name);
        });

        // Search for a match in the current page
        for (const profile of searchResults) {
          //   console.log(profile.name);

          if (profile.name.toLowerCase() === searchInput.value.toLowerCase()) {
            // Redirect to profile page if a match is found
            location.href = `/profile/?name=${profile.name}`;
            return; // Exit the function early
          }
        }
        offset += limit;
        console.log(offset);
        searchBtn.innerText = "Searching...";
        searchBtn.disabled = true;

        //Exit the loop if the offset is greater than 3000
        if (offset >= 3000) {
          searchBtn.disabled = false;
          searchBtn.innerText = "Search";
          searchContainer.innerHTML +=
            "<p>Profile not found within the latest 3000 profiles created</p>";
          break;
        }

        // if (offset >= searchResults.total) {
        //   break;
        // }
      }
      searchForm.reset();
      console.log("profile not found");
    } catch (error) {
      console.log(error);
    }
    //if search term matches any names in the search results, filter and render the profile
    // searchResults.forEach((profile) => {
    //   if (searchTerm.toLowerCase() === profile.name.toLowerCase()) {
    //     location.href = `/profile/?name=${profile.name}`;
    //   }
    // });
  });
}
