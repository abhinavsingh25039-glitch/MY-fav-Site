const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

if (!currentUser) {
  window.location.href = "login.html";
} else {
  const sidebarName = document.getElementById("sidebarName");
  const accountName = document.getElementById("accountName");

  if (sidebarName) sidebarName.textContent = currentUser.name || "User";
  if (accountName) accountName.textContent = currentUser.name || "User";
}

const logoutBtn =
document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {

        localStorage.removeItem("currentUser");

        window.location.href = "login.html";

    });
}