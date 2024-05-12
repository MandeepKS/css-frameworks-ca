export function setLogoutListener() {
  const logout = document.querySelector(".logout");

  /**
   * Event listener for the logout button
   * Remove the token and profile from local storage and redirect to login page
   */

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
