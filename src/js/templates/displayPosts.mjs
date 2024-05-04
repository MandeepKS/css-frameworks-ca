// import { displayPosts } from "./api/posts/display.mjs";
import { load } from "../storage/index.mjs";
const { name } = load("profile");
export function createPostTemplate(postData) {
  const avatar = postData.author.avatar;
  const imageUrl = avatar || "/src/images/default-avatar.png";
  const avatarAlt = `Profile image of ${postData.author.name}`;

  //if there is no media, display nothing
  if (postData.media === null) {
    postData.media = "";
  }

  const formattedDate = new Date(postData.created).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  const post = document.createElement("div");
  post.classList.add("feed-example", "mb-3");
  // const postIDlink = document.createElement("a");
  // postIDlink.href = `/feed/post/?id=${postData.id}`;

  const postContainer = document.createElement("div");
  postContainer.classList.add(
    "publishedWoopsie",
    "w-100",
    "border",
    "rounded",
    "p-3",
    "position-relative"
  );

  const postContent = document.createElement("div");
  postContent.classList.add(
    "name-date",
    "d-flex",
    "flex-wrap",
    "align-items-center"
  );

  const postProfileImage = document.createElement("img");
  postProfileImage.src = `${imageUrl}`;
  postProfileImage.alt = `${avatarAlt}`;
  postProfileImage.classList.add(
    "feed-image",
    "me-1",
    "rounded-circle",
    "object-fit-cover"
  );
  postProfileImage.alt = `Profile image of ${postData.author.name}`;

  const postTitle = document.createElement("h4");
  postTitle.classList.add("fw-bold", "h5", "mx-1", "mb-0");
  postTitle.textContent = `${postData.title}`;

  const usernameLink = document.createElement("a");
  usernameLink.href = `/profile/?name=${postData.author.name}`;

  const postUsername = document.createElement("p");
  postUsername.classList.add("mb-0", "pe-2", "small");
  postUsername.textContent = `@${postData.author.name}`;

  const postDate = document.createElement("small");
  postDate.classList.add("text-muted");
  postDate.textContent = `${formattedDate}`;

  //if name = storage name, show menu
  const menu = document.createElement("div");
  if (postData.author.name === name) {
    //add an icon for a dropdown menu with a edit and delete button inside it when clicked
    menu.classList.add(
      "postmenu",
      "dropdown",
      "ms-auto",
      "position-absolute",
      "text-end",
      "top-0",
      "end-0",
      "pe-2",
      "pt-2"
    );
    menu.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
    const menuContent = document.createElement("div");
    menuContent.classList.add(
      "postmenu-container",
      "position-absolute",
      "p-2",
      "rounded",
      "bg-light",
      "border",
      "end-0",
      "top-0"
    );
    const exitMenu = document.createElement("button");
    exitMenu.classList.add("btn-close");
    exitMenu.setAttribute("aria-label", "Close");
    exitMenu.addEventListener("click", () => {
      menuContent.style.display = "none";
      console.log("clicked close");
    });
    menuContent.append(exitMenu);

    const menuList = document.createElement("ul");
    menuList.classList.add("list-unstyled", "text-center");
    const menuItem1 = document.createElement("li");
    menuItem1.classList.add("postmenu-item");
    const menuItem2 = document.createElement("li");
    menuItem2.classList.add("postmenu-item");
    menuItem1.innerHTML = `Edit`;
    menuItem2.innerHTML = `Delete`;
    menuList.append(menuItem1, menuItem2);
    menuContent.append(menuList);
    menuContent.hidden = true;
    menu.append(menuContent);

    menu.addEventListener("click", (event) => {
      // menuContent.hidden = false;
      console.log("clicked menu");
      menuContent.style.display = "block";
      menuContent.hidden = !menuContent.hidden;
    });
  }

  const postBody = document.createElement("div");

  const postIDlink = document.createElement("a");
  postIDlink.href = `/feed/post/?id=${postData.id}`;

  const postText = document.createElement("p");
  postText.classList.add("m-0", "pt-1");
  postText.textContent = postData.body;

  const postMedia = document.createElement("img");
  postMedia.classList.add("w-100", "mt-2");
  postMedia.src = postData.media;
  postMedia.alt = "Post media";
  if (postData.media === "") {
    postMedia.hidden = true;
  }

  const postTags = document.createElement("div");
  postTags.classList.add("d-flex", "mt-2");
  postData.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.classList.add("badge", "bg-primary", "text-black", "me-1");
    tagElement.textContent = tag;
    postTags.append(tagElement);
  });

  const interactionContainer = document.createElement("div");
  interactionContainer.classList.add(
    "feed-interact",
    "d-flex",
    "justify-content-end",
    "p-2",
    "gap-3"
  );
  interactionContainer.innerHTML = `<div class="comments"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
  class="bi bi-chat" viewBox="0 0 16 16">
  <path
      d="M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105" />
</svg>   ${postData.comments.length}</div>
                            <div class="reactions"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
  class="bi bi-heart" viewBox="0 0 16 16">
  <path
      d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15" />
</svg>   ${postData.reactions.length}</div>`;

  // postIDlink.append(postContainer);

  usernameLink.appendChild(postUsername);
  postContent.append(postProfileImage, postTitle, usernameLink, postDate, menu);
  postBody.append(postText, postMedia);
  postIDlink.appendChild(postBody);
  postContainer.append(postContent, postIDlink, postTags);
  post.append(postContainer, interactionContainer);
  return post;
}

export function renderPostTemplate(postDataList, parent) {
  console.log("Received postDataList:", postDataList);
  const filteredDataList = postDataList.filter(
    (postData) => postData.body !== null
  );
  parent.append(...filteredDataList.map(createPostTemplate));
}

export function renderPostsByProfile(posts, profileName) {
  const profilePosts = posts.filter(
    (post) => post.author.name === profileName && post.body !== null
  );
  feedPosts.append(...profilePosts.map(createPostTemplate));
}
