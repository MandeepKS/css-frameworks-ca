// import { displayPosts } from "./api/posts/display.mjs";
import { load } from "../storage/index.mjs";
import { removePost } from "../api/posts/delete.mjs";
import { removeComment } from "../api/posts/commentDelete.mjs";
import { saveReactionToPost } from "../api/posts/reactToPost.mjs";
// import { commentToPost, getComments } from "../api/posts/index.mjs";
import { setCreateCommentFormListener } from "../handlers/index.mjs";
import { displayComments } from "./displayComments.mjs";
import { displayPostByTag } from "./displayPostByTag.mjs";
import { profilePostTemplate } from "../handlers/postTemplate.mjs";

export function createProfilePostTemplate(postData, profileName, avatar) {
  const { name } = load("profile");
  //   const avatar = postData.avatar;
  const imageUrl = avatar || "/src/images/default-avatar.png";
  const avatarAlt = `Profile image of ${profileName}`;

  //if there is no media, display nothing
  if (postData.media === null) {
    postData.media = "";
  }

  // Edit how the date is displayed
  const formattedDate = new Date(postData.created).toLocaleDateString("nb-NO", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  const formattedUpdatedDate = new Date(postData.updated).toLocaleDateString(
    "nb-NO",
    {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    }
  );

  const post = document.createElement("div");
  post.classList.add("feed-example", "mb-4");
  // const postIDlink = document.createElement("a");
  // postIDlink.href = `/feed/post/?id=${postData.id}`;

  //create the container for the post
  const postContainer = document.createElement("div");
  postContainer.classList.add(
    "publishedWoopsie",
    "w-100",
    "border",
    "rounded",
    "p-3",
    "position-relative"
  );
  postContainer.dataset.id = postData.id;

  //create the header of the post, avatar, title, name, date
  const postContent = document.createElement("div");
  postContent.classList.add(
    "name-date",
    "d-flex",
    "flex-wrap",
    "align-items-center",
    "mb-2"
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
  postProfileImage.alt = `Profile image of ${profileName}`;

  const postTitle = document.createElement("h4");
  postTitle.classList.add("fw-bold", "h5", "mb-0");
  postTitle.textContent = `${postData.title}`;

  const usernameLink = document.createElement("a");
  usernameLink.href = `/profile/?name=${profileName}`;

  const postUsername = document.createElement("p");
  postUsername.classList.add("mb-0", "pe-2", "small");
  postUsername.textContent = `@${profileName}`;

  const postDate = document.createElement("small");
  postDate.classList.add("text-muted", "post-date");
  postDate.textContent = `${formattedDate}`;
  //on mouseover, if post is updated, updated date displays in a tooltip
  if (postData.updated !== postData.created) {
    postDate.title = `Updated: ${formattedUpdatedDate}`;
  }

  //Create menu for delete/edit post
  const menu = document.createElement("div");
  //if name = storage name, show menu
  if (profileName === name) {
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
    menu.style.cursor = "pointer";
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
    menuItem1.classList.add("postmenu-item", "edit-btn");
    const menuItem2 = document.createElement("li");
    menuItem2.classList.add("postmenu-item", "delete-btn");
    menuItem1.innerHTML = `Edit`;
    menuItem2.innerHTML = `Delete`;
    menuList.append(menuItem1, menuItem2);
    menuContent.append(menuList);
    menuContent.hidden = true;
    menu.append(menuContent);

    //set menu to show when clicked
    menu.addEventListener("click", (event) => {
      // menuContent.hidden = false;
      menuContent.style.display = "block";
      menuContent.hidden = !menuContent.hidden;

      //handle delete button
      if (!menuContent.hidden) {
        const deleteBtns = menuContent.querySelectorAll(".delete-btn");

        deleteBtns.forEach((deleteBtn) => {
          deleteBtn.dataset.id = postData.id;
          deleteBtn.addEventListener("click", async () => {
            const postId = deleteBtn.dataset.id;
            console.log(postId);
            console.log("clicked delete");
            await removePost(postId);
            window.location.reload();
          });
        });
      }

      //handle edit button
      if (!menuContent.hidden) {
        const editBtns = menuContent.querySelectorAll(".edit-btn");

        editBtns.forEach((editBtn) => {
          editBtn.dataset.id = postData.id;
          editBtn.addEventListener("click", () => {
            const postId = editBtn.dataset.id;
            console.log(postId);
            console.log("clicked edit");
            window.location.href = `/feed/post/edit/?id=${postId}`;
          });
        });
      }
    });
  }
  // Create the body of the post
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

  //create the footer of the post
  const postTags = document.createElement("div");
  postTags.classList.add("d-flex", "mt-2", "flex-wrap");
  postData.tags.forEach((tag) => {
    const tagElement = document.createElement("span");
    tagElement.classList.add(
      "badge",
      "bg-primary",
      "text-black",
      "me-1",
      "mb-1"
    );
    tagElement.style.cursor = "pointer";
    tagElement.textContent = tag;
    postTags.append(tagElement);

    //select the tag clicked
    tagElement.addEventListener("click", () => {
      displayPostByTag(tag);
    });
  });

  usernameLink.appendChild(postUsername);
  postContent.append(postProfileImage, usernameLink, postDate, menu);
  postBody.append(postTitle, postText, postMedia);
  postIDlink.appendChild(postBody);
  postContainer.append(postContent, postIDlink, postTags);
  post.append(postContainer);
  return post;
}

export function renderProfilePosts(name, avatar, profileData, parent) {
  //   console.log("Received profileData:", profileData);

  //   const { name, avatar, posts } = profileData;
  //   console.log(name);

  const sortedPosts = profileData.sort(
    (a, b) => new Date(b.created) - new Date(a.created)
  );

  // Filter the sorted list to remove posts with both null body and null media
  const filteredPosts = sortedPosts.filter(
    (postData) =>
      (postData.body !== null && postData.body !== "") ||
      (postData.media !== "" && postData.media !== null)
  );

  // Render the sorted and filtered posts
  parent.innerHTML = "";
  parent.append(
    ...filteredPosts.map((postData) =>
      createProfilePostTemplate(postData, name, avatar)
    )
  );
}

// const url = new URL(location.href);
// const profileName = url.searchParams.get("name") || `${name}`;

// profilePostTemplate(profileName);
