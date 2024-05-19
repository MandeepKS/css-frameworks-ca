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
