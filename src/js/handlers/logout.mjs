export function setLogoutListener() {
  const logout = document.querySelector(".logout");

  if (logout) {
    logout.style.cursor = "pointer";
    logout.addEventListener("click", () => {
      // Remove token from local storage
      localStorage.removeItem("profile");
      localStorage.removeItem("token");
      // Redirect to login page
      window.location.href = "/";
    });
  }
}
