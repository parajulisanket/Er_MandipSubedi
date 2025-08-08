document.addEventListener("DOMContentLoaded", function () {
  // Hamburger & mobile menu
  const toggleBtn = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const menuClose = document.getElementById("menu-close");

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation(); // Prevents bubbling to document
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Close button inside mobile menu
  if (menuClose && mobileMenu) {
    menuClose.addEventListener("click", (e) => {
      e.stopPropagation();
      mobileMenu.classList.add("hidden");
    });
  }

  // Hide mobile menu when clicking outside
  document.addEventListener("click", function (e) {
    if (
      mobileMenu &&
      !mobileMenu.classList.contains("hidden") &&
      !mobileMenu.contains(e.target) &&
      (!toggleBtn || !toggleBtn.contains(e.target))
    ) {
      mobileMenu.classList.add("hidden");
    }
  });

  // Dropdown in nav (if you have it)
  const conferenceToggle = document.getElementById("conferenceToggle");
  const conferenceDropdown = document.getElementById("conferenceDropdown");

  if (conferenceToggle && conferenceDropdown) {
    conferenceToggle.addEventListener("click", function (e) {
      e.preventDefault();
      conferenceDropdown.classList.toggle("hidden");
    });

    // Close dropdown when clicking outside
    document.addEventListener("click", function (e) {
      if (
        !conferenceToggle.contains(e.target) &&
        !conferenceDropdown.contains(e.target)
      ) {
        conferenceDropdown.classList.add("hidden");
      }
    });
  }
});
