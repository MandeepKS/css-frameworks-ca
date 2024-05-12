/**
 * Set event listener for edit profile button
 * when clicked, display the edit profile form and a cancel button to close the form
 */

export async function setEditProfileBtnListener() {
  const editButton = document.querySelector(".edit-button");
  if (!editButton) {
    return;
  }
  const editContainer = document.querySelector(".profile-edit");
  const btnContainer = document.querySelector(".btn-container");

  editButton.addEventListener("click", () => {
    editContainer.style.display = "block";
    editButton.children[0].setAttribute("hidden", "hidden");
    const cancelBtn = document.createElement("button");
    cancelBtn.classList.add("btn", "btn-outline-primary", "mb-4", "ms-1");
    cancelBtn.textContent = "Cancel";
    btnContainer.appendChild(cancelBtn);
    cancelBtn.addEventListener("click", () => {
      editButton.children[0].removeAttribute("hidden");
      editContainer.style.display = "none";
      cancelBtn.remove();
    });
  });
}
