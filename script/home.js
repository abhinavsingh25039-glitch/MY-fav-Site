document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const sidebarName = document.getElementById("sidebarName");
  const accountName = document.getElementById("accountName");
  const logoutBtn = document.getElementById("logoutBtn");

  if (!currentUser) {
    window.location.replace("login.html");
    return;
  }

  if (sidebarName) sidebarName.textContent = currentUser.name || "User";
  if (accountName) accountName.textContent = currentUser.name || "User";

  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem("currentUser");
      window.location.replace("login.html");
    });
  }
});