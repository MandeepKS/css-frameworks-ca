/**
 * function to search the feed for posts including the search term
 * takes in the search term and compares it to the title and body in the feed
 * if a match is found, the feed renders the post(s) that match
 * if no match is found, a message is displayed under the search bar
 */

export function searchFeed() {
  const searchContainer = document.querySelector(".search-container");
  const searchForm = document.querySelector("#search-form");
  const searchInput = document.querySelector("#searchTerm");
  const feedContainer = document.querySelector(".feed-posts");
  const noMatchMessage = document.createElement("p");
  noMatchMessage.textContent = `Sorry, no match! To get the feed back: click "All Woopsies" or "FEED" below, or search again`;
  noMatchMessage.classList.add(
    "border",
    "border-2",
    "rounded",
    "bg-dark",
    "text-white",
    "text-center",
    "p-2"
  );

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
      searchInput.placeholder = "Enter something to search";
      return;
    }

    const feedExamples = feedContainer.querySelectorAll(".feed-example");
    let matchFound = false;

    feedExamples.forEach((feedExample) => {
      const postTitle = feedExample
        .querySelector("h4")
        .textContent.toLowerCase();
      const postBody = feedExample.querySelector("p").textContent.toLowerCase();

      if (postTitle.includes(searchTerm) || postBody.includes(searchTerm)) {
        feedExample.style.display = "block";
        matchFound = true;
        searchForm.reset();
      } else {
        feedExample.style.display = "none";
      }
    });

    if (!matchFound) {
      searchContainer.appendChild(noMatchMessage);
      searchForm.reset();
    } else {
      if (searchContainer.contains(noMatchMessage)) {
        searchContainer.removeChild(noMatchMessage);
      }
    }
  });
}
