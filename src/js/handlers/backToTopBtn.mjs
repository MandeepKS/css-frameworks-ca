/**
 * Sets up the back-to-top button.
 * When clicked, the page will scroll to the top.
 * If the button does not exist, the function will return.
 */

export function backToTopBtnHandler() {
  const backToTopBtn = document.querySelector(".back-to-top");
  if (!backToTopBtn) {
    return;
  }

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}
