export function displayComments(postData) {
  try {
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
      console.log("Post Comments: ", postData.title, postData.comments);
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

        const commentAuthorAvatar = document.createElement("img");
        commentAuthorAvatar.src = comment.author.avatar;
        commentAuthorAvatar.alt = `Profile image of ${comment.author.name}`;
        commentAuthorAvatar.classList.add(
          "feed-image",
          "rounded-circle",
          "me-1"
        );
        const commentAuthor = document.createElement("a");
        commentAuthor.href = `/profile/?name=${comment.author.name}`;
        commentAuthor.textContent = comment.author.name;

        const commentText = document.createElement("p");
        commentText.classList.add("comment-body", "m-0", "pt-2");
        commentText.textContent = comment.body;
        commentItem.append(commentAuthorAvatar, commentAuthor, commentText);
        commentsList.append(commentItem);
      });
      postCommentsContainer.append(commentsTitle, commentsList);
    } else {
      postCommentsContainer.textContent = "No comments";
    }
  } catch (error) {
    console.error("Error displaying comments: ", error);
  }
}
