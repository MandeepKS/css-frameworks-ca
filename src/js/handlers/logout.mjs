export function setLogoutListener() {
  const logout = document.querySelector(".logout");
  logout.style.cursor = "pointer";

  if (logout) {
    logout.addEventListener("click", () => {
      // Remove token from local storage
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/";
    });
  }
}
