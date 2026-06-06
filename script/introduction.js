const projectsToggle = document.getElementById("projectsToggle");
const projectsList = document.getElementById("projectsList");
const projectCards = document.querySelectorAll(".project-card");

if (projectsToggle && projectsList) {
  projectsToggle.addEventListener("click", () => {
    const isOpen = !projectsList.classList.contains("open");

    projectsList.classList.toggle("open", isOpen);
    projectsToggle.textContent = isOpen ? "Hide Projects ▲" : "Show All Projects ▼";
    projectsToggle.setAttribute("aria-expanded", String(isOpen));

    projectCards.forEach((card, index) => {
      card.style.transitionDelay = `${index * 60}ms`;
    });
  });
}