// import { displayPosts } from "./api/posts/display.mjs";
import { load } from "../storage/index.mjs";
import { removePost } from "../api/posts/delete.mjs";
import { removeComment } from "../api/posts/commentDelete.mjs";
import { saveReactionToPost } from "../api/posts/reactToPost.mjs";
// import { commentToPost, getComments } from "../api/posts/index.mjs";
import { setCreateCommentFormListener } from "../handlers/index.mjs";
import { displayComments } from "./displayComments.mjs";
import { displayPostByTag } from "./displayPostByTag.mjs";

/**
 * a function that creates a template for a post
 * @param {object} postData the data of the post to be displayed
 * builds and appends all elements of the post to the post template
 * @returns {HTMLDivElement} the post template
 *
 * I know this file is way to long, but I'm not sure how to split it up
 */

export function createPostTemplate(postData) {
  const { name } = load("profile");
  const avatar = postData.author.avatar;
  const imageUrl = avatar || "/src/images/default-avatar.png";
  const avatarAlt = `Profile image of ${postData.author.name}`;

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
  postProfileImage.alt = `Profile image of ${postData.author.name}`;

  const postTitle = document.createElement("h4");
  postTitle.classList.add("fw-bold", "h5", "mb-0");
  postTitle.textContent = `${postData.title}`;

  const usernameLink = document.createElement("a");
  usernameLink.href = `/profile/?name=${postData.author.name}`;

  const postUsername = document.createElement("p");
  postUsername.classList.add("mb-0", "pe-2", "small");
  postUsername.textContent = `@${postData.author.name}`;

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

  //create the interaction container of the post
  const interactionContainer = document.createElement("div");
  interactionContainer.dataset.footerID = postData.id;
  interactionContainer.classList.add("feed-interact", "d-flex", "gap-3");
  const reactionIcons = document.createElement("div");
  reactionIcons.classList.add(
    "reaction-icons",
    "d-flex",
    "gap-2",
    "w-100",
    "justify-content-end"
  );
  const comments = document.createElement("div");
  comments.classList.add("comments", "d-flex", "align-items-center", "gap-1");
  const commentsIcon = document.createElement("svg");
  //path for comments icon in svg folder
  // commentsIcon.src = "/src/svg/comment-1-svgrepo-com.svg";
  commentsIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  commentsIcon.setAttribute("width", "16");
  commentsIcon.setAttribute("height", "16");
  commentsIcon.setAttribute("fill", "currentColor");
  commentsIcon.setAttribute("class", "bi bi-chat");
  commentsIcon.setAttribute("viewBox", "0 0 16 16");
  const commentsPath = document.createElement("path");
  commentsPath.setAttribute(
    "d",
    "M2.678 11.894a1 1 0 0 1 .287.801 11 11 0 0 1-.398 2c1.395-.323 2.247-.697 2.634-.893a1 1 0 0 1 .71-.074A8 8 0 0 0 8 14c3.996 0 7-2.807 7-6s-3.004-6-7-6-7 2.808-7 6c0 1.468.617 2.83 1.678 3.894m-.493 3.905a22 22 0 0 1-.713.129c-.2.032-.352-.176-.273-.362a10 10 0 0 0 .244-.637l.003-.01c.248-.72.45-1.548.524-2.319C.743 11.37 0 9.76 0 8c0-3.866 3.582-7 8-7s8 3.134 8 7-3.582 7-8 7a9 9 0 0 1-2.347-.306c-.52.263-1.639.742-3.468 1.105"
  );
  commentsIcon.style.cursor = "pointer";
  commentsIcon.append(commentsPath);
  comments.append(commentsIcon, postData.comments.length);

  const commentsContainer = document.createElement("div");
  commentsContainer.classList.add(
    "comments-container",
    "d-none",
    "border",
    "border-top-0",
    "rounded",
    "p-3"
  );
  const replyTo = document.createElement("p");
  replyTo.classList.add("reply-to", "mb-0", "fst-italic");
  replyTo.textContent = `Reply to ${postData.author.name}...`;
  commentsContainer.append(replyTo);

  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form", "w-100", "d-none", "mb-3");
  commentForm.dataset.formId = postData.id;
  const commentLabel = document.createElement("label");
  commentLabel.classList.add("visually-hidden");
  //label for the comment input
  commentLabel.htmlFor = "body";
  commentLabel.textContent = "Write a comment";
  const commentInput = document.createElement("input");
  commentInput.classList.add("form-control", "comment-input", "mb-2");
  commentInput.name = "body";
  commentInput.type = "text";
  commentInput.setAttribute("required", true);
  commentInput.placeholder = "Write a comment...";

  const commentSubmit = document.createElement("button");
  commentSubmit.classList.add("btn", "btn-primary", "comment-submit");
  commentSubmit.type = "submit";
  commentSubmit.textContent = "Post comment";

  const commentClose = document.createElement("button");
  commentClose.classList.add("btn", "btn-secondary", "comment-close");
  commentClose.type = "button";
  commentClose.textContent = "Close";
  commentClose.addEventListener("click", () => {
    interactionContainer.classList.remove("flex-column");
    commentsContainer.classList.toggle("d-none");
    commentForm.classList.toggle("d-none");
  });

  const postCommentsContainer = document.createElement("div");
  postCommentsContainer.classList.add(
    "comments-container",
    "d-flex",
    "flex-column"
  );
  const commentsTitle = document.createElement("h5");
  commentsTitle.textContent = "Comments";

  const commentsList = document.createElement("ul");
  commentsList.classList.add("list-unstyled", "comments-list");
  if (postData.comments.length > 0) {
    // console.log("Post Comments: ", postData.title, postData.comments);
    postData.comments.forEach((comment) => {
      const commentItem = document.createElement("li");
      commentItem.classList.add(
        "comment-item",
        "mb-2",
        "mt-2",
        "border",
        "rounded",
        "p-2"
      );
      commentItem.dataset.commentId = comment.id;
      const commentHeader = document.createElement("div");
      commentHeader.classList.add("comment-header", "d-flex");
      const commentHeaderAuthorInfo = document.createElement("div");
      commentHeaderAuthorInfo.classList.add("author-info");
      const commentAuthorAvatar = document.createElement("img");
      const profileAvatar =
        comment.author.avatar || "/src/images/default-avatar.png";
      commentAuthorAvatar.src = profileAvatar;
      commentAuthorAvatar.alt = `Profile image of ${comment.author.name}`;
      commentAuthorAvatar.classList.add("feed-image", "rounded-circle", "me-1");
      const commentAuthor = document.createElement("a");
      commentAuthor.href = `/profile/?name=${comment.author.name}`;
      commentAuthor.textContent = comment.author.name;

      commentHeaderAuthorInfo.append(commentAuthorAvatar, commentAuthor);

      const deleteComment = document.createElement("div");
      deleteComment.style.cursor = "pointer";
      if (comment.author.name === name) {
        deleteComment.classList.add("delete-comment", "ms-auto");
        // deleteComment.innerHTML = `<i class="fa-solid fa-ellipsis-vertical"></i>`;
        deleteComment.textContent = "Delete";

        deleteComment.addEventListener("click", async () => {
          const commentId = commentItem.dataset.commentId;

          await removeComment(postData.id, commentId);
          commentItem.remove();
          //if the comment ul list is empty, display a comment that says no comments
          if (commentsList.children.length === 0) {
            postCommentsContainer.textContent = "No comments";
          }
        });
      }

      commentHeader.append(commentHeaderAuthorInfo, deleteComment);

      const commentText = document.createElement("p");
      commentText.classList.add("comment-body", "m-0", "pt-2");
      commentText.textContent = comment.body;

      commentItem.append(commentHeader, commentText);
      commentsList.append(commentItem);
    });
    postCommentsContainer.append(commentsTitle, commentsList);
  } else {
    postCommentsContainer.textContent = "No comments";
  }

  commentForm.append(commentLabel, commentInput, commentSubmit, commentClose);
  commentsContainer.append(commentForm, postCommentsContainer);

  comments.addEventListener("click", () => {
    interactionContainer.classList.add("flex-column");
    interactionContainer.append(commentsContainer);
    commentsContainer.classList.toggle("d-none");
    commentForm.classList.toggle("d-none");
    interactionContainer.append(commentsContainer);
    setCreateCommentFormListener();
  });

  const reactions = document.createElement("div");
  reactions.classList.add("reactions", "d-flex", "align-items-center", "gap-1");
  const reactionsIcon = document.createElement("svg");
  reactionsIcon.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  reactionsIcon.setAttribute("width", "16");
  reactionsIcon.setAttribute("height", "16");
  reactionsIcon.setAttribute("fill", "currentColor");
  reactionsIcon.setAttribute("class", "bi bi-heart");
  reactionsIcon.setAttribute("viewBox", "0 0 16 16");
  const reactionsPath = document.createElement("path");
  reactionsPath.setAttribute(
    "d",
    "m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"
  );
  reactionsIcon.style.cursor = "pointer";
  //get total count of reactions
  let totalCount = 0;

  postData.reactions.forEach((reaction) => {
    totalCount += reaction.count;
  });
  const reactionsTotalCount = document.createElement("span");

  reactionsTotalCount.textContent = totalCount;

  //display icon and the total count of reactions
  reactionsIcon.append(reactionsPath);
  reactions.append(reactionsIcon, reactionsTotalCount);

  reactions.addEventListener("click", () => {
    saveReactionToPost("❤️", postData.id);
    reactionsIcon.removeAttribute("bi-heart");
    reactionsIcon.setAttribute("class", "bi-heart-fill");
    reactionsIcon.style.color = "pink";
    reactionsTotalCount.textContent = totalCount + 1;
  });

  reactionIcons.append(comments, reactions);
  interactionContainer.append(reactionIcons);

  usernameLink.appendChild(postUsername);
  postContent.append(postProfileImage, usernameLink, postDate, menu);
  postBody.append(postTitle, postText, postMedia);
  postIDlink.appendChild(postBody);
  postContainer.append(postContent, postIDlink, postTags);
  post.append(postContainer, interactionContainer);
  return post;
}

export function renderPostTemplate(postDataList, parent) {
  // console.log("Received postDataList:", postDataList);
  const filteredDataList = postDataList.filter(
    (postData) =>
      (postData.body !== null && postData.body !== "") ||
      (postData.media !== "" && postData.media !== null)
  );
  parent.append(...filteredDataList.map(createPostTemplate));
}
