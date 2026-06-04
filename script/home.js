document.addEventListener("DOMContentLoaded", () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const sidebarName = document.getElementById("sidebarName");
  const accountName = document.getElementById("accountName");
  const logoutBtn = document.getElementById("logoutBtn");
  const profilePhotoInput = document.getElementById("profilePhotoInput");
  const removeTopAvatarBtn = document.getElementById("removeTopAvatarBtn");

  if (!currentUser) {
    window.location.replace("login.html");
    return;
  }

  function applyAvatar() {
    const images = document.querySelectorAll(".avatar-shell img, .account-image img, .profile-link img");
    images.forEach((img) => {
      img.src = currentUser.avatar || "assets/ID-photo.png";
      img.onerror = () => {
        img.src = "assets/ID-photo.png";
      };
    });
  }

  function saveAvatar(avatarData) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const updatedUser = { ...currentUser, avatar: avatarData };

    const updatedUsers = users.map((u) =>
      u.email === currentUser.email ? updatedUser : u
    );

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    return updatedUser;
  }

  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  if (sidebarName) sidebarName.textContent = currentUser.name || "User";
  if (accountName) accountName.textContent = currentUser.name || "User";

  applyAvatar();

  profilePhotoInput?.addEventListener("change", async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const updatedUser = saveAvatar(await fileToDataUrl(file));
      currentUser.avatar = updatedUser.avatar;
      applyAvatar();
    } catch {
      alert("Could not upload the image.");
    }
  });

  removeTopAvatarBtn?.addEventListener("click", () => {
    const updatedUser = saveAvatar("");
    currentUser.avatar = updatedUser.avatar;
    applyAvatar();
  });

  logoutBtn?.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("currentUser");
    window.location.replace("login.html");
  });
});